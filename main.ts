enum vocabularyList{
    VOICE_OPEN = 1,
    VOICE_CLOSE = 2,
    VOICE_OPEN_LIGHT = 3,
    VOICE_CLOSE_LIGHT = 4,
    VOICE_BRIGHTER = 5,
    VOICE_DARK = 6,
    VOICE_SWITCH_COLOR = 7,
    VOICE_START = 8,
    VOICE_STOP = 9,
    VOICE_SWITCH_MODE = 10

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
    let lastvoc = vocabularyList.VOICE_OPEN
    //% block="ASR sensor IIC port hear %vocabulary"
    //% vocabulary.fieldEditor="gridpicker" vocabulary.fieldOptions.columns=3
    //% blockId = ASR
    export function  ASR(vocabulary:vocabularyList,handler:() => void ){
        control.onEvent(asrEventId,vocabulary,handler)
        control.inBackground(function () {
            while (true) {
                const readData = serial.readBuffer(1).toArray(NumberFormat.UInt8BE);
                if (1==readData[0]) {
                    lastvoc = vocabularyList.VOICE_OPEN;
                    control.raiseEvent(asrEventId, lastvoc);
                }else if(2==readData[0]){
                    lastvoc = vocabularyList.VOICE_CLOSE;
                    control.raiseEvent(asrEventId, lastvoc);
                }else if(3==readData[0]){
                    lastvoc = vocabularyList.VOICE_OPEN_LIGHT;
                    control.raiseEvent(asrEventId, lastvoc);
                }else if(4==readData[0]){
                    lastvoc = vocabularyList.VOICE_CLOSE_LIGHT;
                    control.raiseEvent(asrEventId, lastvoc);
                }else if(5==readData[0]){
                    lastvoc = vocabularyList.VOICE_BRIGHTER;
                    control.raiseEvent(asrEventId, lastvoc);
                } else if (6 == readData[0]) {
                    lastvoc = vocabularyList.VOICE_DARK;
                    control.raiseEvent(asrEventId, lastvoc);
                } else if (7 == readData[0]) {
                    lastvoc = vocabularyList.VOICE_SWITCH_COLOR;
                    control.raiseEvent(asrEventId, lastvoc);
                } else if (8 == readData[0]) {
                    lastvoc = vocabularyList.VOICE_START;
                    control.raiseEvent(asrEventId, lastvoc);
                } else if (9 == readData[0]) {
                    lastvoc = vocabularyList.VOICE_STOP;
                    control.raiseEvent(asrEventId, lastvoc);
                } else if (10 == readData[0]) {
                    lastvoc = vocabularyList.VOICE_SWITCH_MODE;
                    control.raiseEvent(asrEventId, lastvoc);
                }
                basic.pause(100);
            }
        })

    }

    //% block="asr_logic %vocabulary"
    //% vocabulary.fieldEditor="gridpicker" vocabulary.fieldOptions.columns=3
    //% blockId = "asr_logic"
    export function asr_logic(vocabulary: vocabularyList): boolean {
        const readData2 = serial.readBuffer(1).toArray(NumberFormat.UInt8BE);
        if (1 == readData2[0]) {
            return vocabulary == vocabularyList.VOICE_OPEN;
        } else if (2 == readData2[0]) {
            return vocabulary == vocabularyList.VOICE_CLOSE;
        } else if (3 == readData2[0]) {
            return vocabulary == vocabularyList.VOICE_OPEN_LIGHT;
        } else if (4 == readData2[0]) {
            return vocabulary == vocabularyList.VOICE_CLOSE_LIGHT;
        } else if (5 == readData2[0]) {
            return vocabulary == vocabularyList.VOICE_BRIGHTER;
        } else if (6 == readData2[0]) {
            return vocabulary == vocabularyList.VOICE_DARK;
        } else if (7 == readData2[0]) {
            return vocabulary == vocabularyList.VOICE_SWITCH_COLOR;
        } else if (8 == readData2[0]) {
            return vocabulary == vocabularyList.VOICE_START;
        } else if (9 == readData2[0]) {
            return vocabulary == vocabularyList.VOICE_STOP;
        } else if (10 == readData2[0]) {
            return vocabulary == vocabularyList.VOICE_SWITCH_MODE;
        }
        return false
    }


   

    
}