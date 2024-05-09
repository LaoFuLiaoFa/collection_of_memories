var wsServerUri = 'wss://audio.developer.nsu.edu.cn/ws_rec/'
//var AsrMode = "2pass"

var sampleBuf = new Int16Array()
var audioBlob

var voiceServerStatus = false
var recordStatus = false
var touchStatus = false

var isRec = false
var isfilemode = false

var rec_text = '' // for online rec asr result
var offline_text = '' // for offline rec asr result

var callBackFun

//录音并发送数据
const recProcess = function (
  buffer,
  powerLevel,
  bufferDuration,
  bufferSampleRate,
  newBufferIdx,
  asyncEnd
) {
  if (isRec === true) {
    var data_48k = buffer[buffer.length - 1]

    var array_48k = new Array(data_48k)
    var data_16k = Recorder.SampleData(array_48k, bufferSampleRate, 16000).data

    sampleBuf = Int16Array.from([...sampleBuf, ...data_16k])
    var chunk_size = 960 // for asr chunk_size [5, 10, 5]
    //屏蔽显示秒数
    //info_div.innerHTML = "" + bufferDuration / 1000 + "s";
    while (sampleBuf.length >= chunk_size) {
      let sendBuf = sampleBuf.slice(0, chunk_size)
      sampleBuf = sampleBuf.slice(chunk_size, sampleBuf.length)
      wsconnecter.wsSend(sendBuf)
    }
  }
}

// 语音识别结果; 对jsonMsg数据解析,将识别结果附加到编辑框中
const getJsonMessage = function (jsonMsg, callback) {
  //console.log(jsonMsg);
  console.log('message: ' + JSON.parse(jsonMsg.data)['text'])
  var rectxt = '' + JSON.parse(jsonMsg.data)['text']
  var asrmodel = JSON.parse(jsonMsg.data)['mode']
  var is_final = JSON.parse(jsonMsg.data)['is_speaking']
  var timestamp = JSON.parse(jsonMsg.data)['timestamp']
  if (asrmodel == '2pass-offline' || asrmodel == 'offline') {
    offline_text = offline_text + handleWithTimestamp(rectxt, timestamp) //rectxt; //.replace(/ +/g,"");
    rec_text = offline_text
  } else {
    rec_text = rec_text + rectxt //.replace(/ +/g,"");
  }

  //显示结果
  console.log('offline_text: ' + asrmodel + ',' + offline_text)
  console.log('rec_text: ' + rec_text)
  callback(rec_text)
}

// webscoket连接状态响应
const getConnState = function (connState) {
  if (connState === 0) {
    //on open
    voiceServerStatus = true
    console.log('连接成功!等待开始')
  } else if (connState === 1) {
    //stop();
  } else if (connState === 2) {
    console.log('webscoket connecttion error')
    alert('连接地址' + wsServerUri + '失败,请检查asr地址和端口。或刷新重试。')
  }
}

function handleWithTimestamp(tmptext, tmptime) {
  console.log('tmptext: ' + tmptext)
  console.log('tmptime: ' + tmptime)
  if (tmptime == null || tmptime == 'undefined' || tmptext.length <= 0) {
    return tmptext
  }
  tmptext = tmptext.replace(/。|？|，|、|\?|\.|\ /g, ',') // in case there are a lot of "。"
  var words = tmptext.split(',') // split to chinese sentence or english words
  console.log('words', words)
  var jsontime = JSON.parse(tmptime) //JSON.parse(tmptime.replace(/\]\]\[\[/g, "],[")); // in case there are a lot segments by VAD
  var char_index = 0 // index for timestamp
  var text_withtime = ''
  for (var i = 0; i < words.length; i++) {
    if (words[i] == 'undefined' || words[i].length <= 0) {
      continue
    }
    console.log('words===', words[i])
    console.log(
      'words: ' + words[i] + ',time=' + jsontime[char_index][0] / 1000
    )
    if (/^[a-zA-Z]+$/.test(words[i])) {
      // if it is english
      text_withtime =
        text_withtime + jsontime[char_index][0] / 1000 + ':' + words[i] + '\n'
      char_index = char_index + 1 //for english, timestamp unit is about a word
    } else {
      // if it is chinese
      text_withtime =
        text_withtime + jsontime[char_index][0] / 1000 + ':' + words[i] + '\n'
      char_index = char_index + words[i].length //for chinese, timestamp unit is about a char
    }
  }
  return text_withtime
}

const WebSocketConnectMethod = function (config) {
  //定义socket连接方法类

  var speechSokt
  var connKeeperID

  var msgHandle = config.msgHandle
  var stateHandle = config.stateHandle
  var callbackHandle = config.callbackHandle

  this.wsStart = function () {
    var Uri = config.serverUrl
    if (Uri.match(/wss:\S*|ws:\S*/)) {
      console.log('Uri' + Uri)
    } else {
      alert('请检查wss地址正确性')
      return 0
    }

    if ('WebSocket' in window) {
      speechSokt = new WebSocket(Uri) // 定义socket连接对象
      speechSokt.onopen = function (e) {
        onOpen(e)
      } // 定义响应函数
      speechSokt.onclose = function (e) {
        console.log('onclose ws!')
        //speechSokt.close();
        onClose(e)
      }
      speechSokt.onmessage = function (e) {
        onMessage(e)
      }
      speechSokt.onerror = function (e) {
        onError(e)
      }
      return 1
    } else {
      alert('当前浏览器不支持 WebSocket')
      return 0
    }
  }

  // 定义停止与发送函数
  this.wsStop = function () {
    if (speechSokt != undefined) {
      console.log('stop ws!')
      speechSokt.close()
    }
  }

  this.wsSend = function (oneData) {
    if (speechSokt == undefined) return
    if (speechSokt.readyState === 1) {
      // 0:CONNECTING, 1:OPEN, 2:CLOSING, 3:CLOSED

      speechSokt.send(oneData)
    }
  }

  // SOCEKT连接中的消息与状态响应
  function onOpen(e) {
    // 发送json
    var chunk_size = new Array(5, 10, 5)
    var request = {
      is_speaking: true
    }

    console.log(JSON.stringify(request))
    speechSokt.send(JSON.stringify(request))
    console.log('连接成功')
    stateHandle(0)
  }

  function onClose(e) {
    stateHandle(1)
  }

  function onMessage(e) {
    msgHandle(e, callbackHandle)
  }

  function onError(e) {
    console.log('ws发生错误')
    console.log(e)
    stateHandle(2)
  }
}

// 连接; 定义socket连接类对象与语音对象
var wsconnecter

// 录音; 定义录音对象,wav格式
var rec = Recorder({
  type: 'pcm',
  bitRate: 16,
  sampleRate: 16000,
  onProcess: recProcess
})

export function initRecord(callback, serverUrl) {
  console.log(123)
  if (callback != undefined) {
    callBackFun = callback
  }
  if (serverUrl != undefined) {
    wsServerUri = serverUrl
  }

  //初始化连接
  wsconnecter = new WebSocketConnectMethod({
    serverUrl: wsServerUri,
    msgHandle: getJsonMessage,
    stateHandle: getConnState,
    callbackHandle: callBackFun
  })
  var ret = wsconnecter.wsStart()
  // 1 is ok, 0 is error
  if (ret == 1) {
    console.log('正在连接asr服务器，请等待...')
    isRec = true
    return 1
  } else {
    return ret
  }
}

//initRecord()

export function startRecord() {
  console.log('startRecord')
  if (recordStatus) {
    return
  }

  recordStatus = true
  console.log('startRecord')
  if (!voiceServerStatus) {
    return '语音服务器初始化失败，无法录音'
  }

  //清除上一次对话内容
  rec_text = ''
  offline_text = ''

  //开始录音
  rec.open(function () {
    rec.start()
    console.log('开始')
    return 'start'
  })
}

export function stopRecord() {
  if (!recordStatus) {
    return
  }
  recordStatus = false
  console.log('stopRecord')

  //结束录音
  var chunk_size = new Array(5, 10, 5)
  var request = {
    is_speaking: false
  }
  console.log(request)
  if (sampleBuf.length > 0) {
    wsconnecter.wsSend(sampleBuf)
    console.log('sampleBuf.length' + sampleBuf.length)
    sampleBuf = new Int16Array()
  }
  wsconnecter.wsSend(JSON.stringify(request))

  //rec.stop();
  //rec.close();
  //wsconnecter.wsStop();
  //initRecord();

  //停止发送数据，下次修改一下不结束ws，直接继续发
  setTimeout(function () {
    console.log('call stop ws!')
    wsconnecter.wsStop()
    initRecord()
    //rec_text = rec_text + "\n";
    //offline_text = offline_text + "\n";
  }, 1000)

  //停止录音,并把blob转wav,发送到录音条以供测试预览
  rec.stop(
    function (blob, duration) {
      //进行下一次初始化
      //rec.close;
      /*setTimeout(function () {
            initRecord();
        }, 1000);*/

      console.log(blob)
      /*
        var audioBlob = Recorder.pcm2wav({ sampleRate: 16000, bitRate: 16, blob: blob },
            function (theblob, duration) {
                console.log(theblob);
                var audio_record = document.getElementById('audio_record');
                audio_record.src = (window.URL || webkitURL).createObjectURL(theblob);
                audio_record.controls = true;
                //audio_record.play();
            }, function (msg) {
                console.log(msg);
            }
        );
        */
    },
    function (errMsg) {
      if (showLog) {
        info_div.innerHTML = 'errMsg: ' + errMsg
      }
      console.log('errMsg: ' + errMsg)
    }
  )
}

export default function () {
  console.log('default')
} // 或者其他导出的实体
