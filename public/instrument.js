class Instrument {
    constructor(name, synth){
        this.name = name;
        this.synth = synth;
        this.img = '';
    }

    getName(){
        return this.name;
    }

    setImg(newImg){
        this.img = newImg;
    }

    getImg(){
        return this.img;
    }

    playSynth(note, duration, nextTime){
        console.log(nextTime);
        if(nextTime === undefined){
            this.synth.triggerAttackRelease(note, duration);
        } else {
            this.synth.triggerAttackRelease(note, duration, Tone.now() + 0.01);
        }
        
    }
}