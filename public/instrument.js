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

    playSynth(note, duration, nextTime = "+0.001"){
        this.synth.triggerAttackRelease(note, duration);
    }
}