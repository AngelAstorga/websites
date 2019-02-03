

const btnStart= document.getElementById('btnStart');

const blue=document.getElementById('blue');
const orange=document.getElementById('orange');
const purple=document.getElementById('purple');
const green=document.getElementById('green');
const counter=document.getElementById('counter');
const LAST_LEVEL=10;

class Game{
    constructor(){
        this.initialize();
        setTimeout(this.nextLevel.bind(this),600);
    }
    initialize(){
        
        this.chooseColor=this.chooseColor.bind(this);
        this.generateRandomNumbers();
        this.toggleBtnStart();
        this.level=1;
        counter.innerHTML=this.level;
        this.colors={'blue':blue,'orange':orange,'purple':purple,'green':green};
        
    }
    toggleBtnStart(){
        if(btnStart.classList.contains('hide')){
            btnStart.classList.remove('hide');
            
        }else{
            btnStart.classList.add('hide');
            
        }
    }
    generateRandomNumbers(){
        this.sequence= new Array(LAST_LEVEL).fill(0).map(n=>Math.floor(Math.random()*4));
        
    }
    nextLevel(){
        this.subLevel=0;
        this.lightSequence();
        this.addEventClick();
    }
    transformColorToNumber(color){
        switch(color){
            case 'blue':
            return 0;
            case 'orange':
            return 2;
            case 'purple':
            return 1;
            case 'green':
            return 3;
        }
    }
    transformNumberToColor(num){
        switch(num){
            case 0:
            return 'blue';
            case 2:
            return 'orange';
            case 1:
            return 'purple';
            case 3:
            return 'green';
        }
    }

    lightSequence(){
        for(let i=0;i<this.level;i++){
            
            const color=this.transformNumberToColor(this.sequence[i]);
            
            setTimeout(()=>this.lightColor(color),1000*i);
            
        }
    }

    lightColor(color){
        
        this.colors[color].classList.add('light');
        setTimeout(()=>this.turnOffLight(color),350);
    }
    turnOffLight(color){
        this.colors[color].classList.remove('light');
    }
    addEventClick(){
        this.colors.blue.addEventListener('click',this.chooseColor);
        this.colors.green.addEventListener('click',this.chooseColor);
        this.colors.purple.addEventListener('click',this.chooseColor);
        this.colors.orange.addEventListener('click',this.chooseColor);
    }
    deleteEventClicks(){
        this.colors['blue'].removeEventListener('click',this.chooseColor);
        this.colors['green'].removeEventListener('click',this.chooseColor);
        this.colors['purple'].removeEventListener('click',this.chooseColor);
        this.colors['orange'].removeEventListener('click',this.chooseColor);
    }
    chooseColor(ev){
        const nameColor = ev.target.dataset.color;
        const numberColor = this.transformColorToNumber(nameColor);
        this.lightColor(nameColor);
        if(numberColor=== this.sequence[this.subLevel]){
            this.subLevel++;
            if(this.subLevel == this.level){
                this.level++;
                counter.innerHTML=this.level;
                this.deleteEventClicks();
                if(this.level==(LAST_LEVEL+1)){
                    this.youWin();
                }else{
                    setTimeout(this.nextLevel.bind(this),1500);
                }
            }
        }else{
            this.deleteEventClicks();
            this.youLost();
        }
    }
    youWin(){
        swal('Memorize','You Win','success')
        .then(this.initialize.bind(this));
    }
    youLost(){
            
        swal('Memorize','You Lost','error').then(this.initialize.bind(this));
            
    }
}

function startGame(){
    window.game= new Game();
    
}