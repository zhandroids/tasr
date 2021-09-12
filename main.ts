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

    /**
     * Connects to the Serial voice Recognition.
     * @param asrRX voice Recognition device receiver pin (RX), eg: DigitalPin.P0
     * @param asrTX voice Recognition device transmitter pin (TX), eg: DigitalPin.P1
     */
    //% blockId="makerbit_asr_connect" block="connect ASR device with ASR RX attached to %asrRX | and ASR TX to %asrTX"
    //% asrRX.fieldEditor="gridpicker" asrRX.fieldOptions.columns=3
    //% asrRX.fieldOptions.tooltips="false"
    //% asrTX.fieldEditor="gridpicker" asrTX.fieldOptions.columns=3
    //% asrTX.fieldOptions.tooltips="false"
    //% weight=50 
    export function connectSerialASR(asrRX: DigitalPin, asrTX: DigitalPin): void {
        serial.redirect(asrRX as number, asrTX as number, BaudRate.BaudRate9600);
    }

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
                    lastvoc = vocabularyList.VOICE_225;
                    control.raiseEvent(asrEventId, lastvoc);
                }else if(226==readData[0]){
                    lastvoc = vocabularyList.VOICE_226;
                    control.raiseEvent(asrEventId, lastvoc);

                }else if(227==readData[0]){
                    lastvoc = vocabularyList.VOICE_227;
                    control.raiseEvent(asrEventId, lastvoc);
                }else if(228==readData[0]){
                    lastvoc = vocabularyList.VOICE_228;
                    control.raiseEvent(asrEventId, lastvoc);
                }else if(229==readData[0]){
                    lastvoc = vocabularyList.VOICE_229;
                    control.raiseEvent(asrEventId, lastvoc);
                }
                basic.pause(100);
            }
        })

    }

    //% block="ASR sensor IIC port hear %vocabulary"
    //% result.fieldEditor="gridpicker" vocabulary.fieldOptions.columns=3
    //% blockId = ASR
    export function delimiters(vocabulary: vocabularyList): boolean {
        const readData = serial.readBuffer(1).toArray(NumberFormat.UInt8BE);

    
        if (225 == readData[0]) {
            return readData[0] == vocabularyList.VOICE_225;
        } else if (226 == readData[0]) {
            return readData[0] == vocabularyList.VOICE_226;
        } else if (227 == readData[0]) {
            return readData[0] == vocabularyList.VOICE_227;
        } else if (228 == readData[0]) {
            return readData[0] == vocabularyList.VOICE_228;
        } else if (229 == readData[0]) {
            return readData[0] == vocabularyList.VOICE_229;
        }
        return false
    }

    
}