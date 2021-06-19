enum vocabularyList{
    VOICE_YES = 1,
    VOICE_NO = 2,
    VOICE_225 = 225,
    VOICE_226 = 226,
    VOICE_227 = 227,
    VOICE_228 = 228,
    VOICE_229 = 229

}

namespace mASR{

    let asrEventId = 3500
    let lastvoc = vocabularyList.VOICE_YES
    //% block="ASR sensor IIC port hear %vocabulary"
    //% vocabulary.fieldEditor="gridpicker" vocabulary.fieldOptions.columns=3
    //% blockId = ASR
    export function  ASR(vocabulary:vocabularyList,handler:() => void ){
        control.onEvent(asrEventId,vocabulary,handler)
        control.inBackground(function () {
            while (true) {
                const readData = serial.readBuffer(1).toArray(NumberFormat.UInt8BE);
                if (225==readData[0]) {
                    lastvoc = vocabularyList.VOICE_225
                }else if(226==readData[0]){
                    lastvoc = vocabularyList.VOICE_226
                }else if(227==readData[0]){
                    lastvoc = vocabularyList.VOICE_227
                }else if(228==readData[0]){
                    lastvoc = vocabularyList.VOICE_228
                }else if(229==readData[0]){
                    lastvoc = vocabularyList.VOICE_229
                }
                control.raiseEvent(asrEventId, lastvoc);
                basic.pause(100);
            }
        })

    }
}