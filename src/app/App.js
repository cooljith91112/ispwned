import React, {Component} from 'react';
import SearchField from './SearchField';
import vex from 'vex-js/dist/js/vex.combined';
import SoundCloudAudio from 'soundcloud-audio';
import './index.css';
export default class App extends Component {
    
    constructor(props){
        super(props);
        this.musicPlayer = new SoundCloudAudio('1b0ff6d5c4606e7fdf5d744be591b5a4');
        vex.defaultOptions.className = 'vex-theme-wireframe';
        vex.defaultOptions.afterClose = ()=>{
            // this.playMusic(); //mute music for good
        }

        this.playMusic = this.playMusic.bind(this);
        this.state = {
            konamiKlass: ''
        };
    }

    componentDidMount(){
        vex.dialog.alert('This website is for educational purpose only. Every data is fetched from haveibeenpwned.com');
        this.konamiListener();
    }
    
    render(){
        return(
            <div id="content" className={`${this.state.konamiKlass}`}>
            <SearchField />
            </div>
        );
    }

    playMusic(){
        this.musicPlayer.stop(); // fallback
        if (!this.musicPlayer.playing) {
            this.musicPlayer.resolve('https://soundcloud.com/djangodjango/first-light', (playlist) => {

                this.musicPlayer.play();

                this.musicPlayer.on('ended', () => {
                    this.musicPlayer.play();

                });
            });
        }
    }

    konamiListener(){
        if ( window.addEventListener ) {
            var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
            window.addEventListener("keydown", (e)=>{
                kkeys.push( e.keyCode );
                // debugger;
                if ( kkeys.toString().indexOf( konami ) >= 0 ){
                    // console.log('Aila');
                    this.setState({
                        konamiKlass:'konami'
                    });
                    this.playMusic();
                    kkeys = [];
        }
            }, true);
        }
    }
}