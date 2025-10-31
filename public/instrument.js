class Instrument {
    constructor(name, synth){
        this.name = name;
        this.synth = synth;
    }

    getName(){
        return this.name;
    }

    playSynth(note, duration, nextTime = "+0.001"){

        console.log(nextTime);

        if(nextTime){
            
            this.synth.triggerAttackRelease(note, duration, nextTime);
        } else{

        }
        this.synth.triggerAttackRelease(note, duration)
    }

}