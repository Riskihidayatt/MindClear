// Audio player utility for background music
import { useState, useCallback, useEffect } from 'react';

// Procedural ambient music generator
class ProceduralMusicGenerator {
  constructor() {
    this.context = null;
    this.isPlaying = false;
    this.nodes = [];
    this.masterGain = null;
    this.initAudio();
  }

  async initAudio() {
    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      this.masterGain.gain.value = 0.1; // Low volume for background
    } catch {
      console.log('Audio context not supported');
    }
  }

  async resumeContext() {
    if (this.context && this.context.state === 'suspended') {
      await this.context.resume();
    }
  }

  // Generate calming ambient tones
  createAmbientTone(frequency, type = 'sine') {
    if (!this.context) return null;

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    filter.type = 'lowpass';
    filter.frequency.value = frequency * 2;
    filter.Q.value = 1;
    
    // Gentle volume envelope
    gainNode.gain.setValueAtTime(0, this.context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.02, this.context.currentTime + 2);
    
    oscillator.start(this.context.currentTime);
    
    return { oscillator, gainNode, filter };
  }

  // Create lofi-style ambient music
  async startLofiAmbient() {
    await this.resumeContext();
    if (!this.context || this.isPlaying) return;

    this.isPlaying = true;
    
    // Base frequencies for calming ambient tones
    const baseFreqs = [55, 82.5, 110, 165]; // A1, E2, A2, E3
    
    baseFreqs.forEach((freq, index) => {
      const node = this.createAmbientTone(freq, 'sine');
      if (node) {
        this.nodes.push(node);
        
        // Add subtle frequency modulation for organic feel
        setTimeout(() => {
          if (node.oscillator && this.context) {
            const lfo = this.context.createOscillator();
            const lfoGain = this.context.createGain();
            
            lfo.frequency.value = 0.1 + Math.random() * 0.2; // Very slow modulation
            lfoGain.gain.value = 2; // Small frequency variation
            
            lfo.connect(lfoGain);
            lfoGain.connect(node.oscillator.frequency);
            lfo.start(this.context.currentTime);
            
            node.lfo = lfo;
            node.lfoGain = lfoGain;
          }
        }, index * 1000);
      }
    });
  }

  // Create nature sounds effect
  async startNatureSounds() {
    await this.resumeContext();
    if (!this.context || this.isPlaying) return;

    this.isPlaying = true;
    
    // Generate pink noise for nature-like ambient
    const bufferSize = this.context.sampleRate * 2;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Pink noise generation
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    
    const noise = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gainNode = this.context.createGain();
    
    noise.buffer = buffer;
    noise.loop = true;
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    filter.Q.value = 0.5;
    
    gainNode.gain.value = 0.03;
    
    noise.start(this.context.currentTime);
    this.nodes.push({ noise, filter, gainNode });
  }

  stop() {
    this.nodes.forEach(node => {
      if (node.oscillator) {
        node.oscillator.stop();
      }
      if (node.noise) {
        node.noise.stop();
      }
      if (node.lfo) {
        node.lfo.stop();
      }
    });
    
    this.nodes = [];
    this.isPlaying = false;
  }

  setVolume(volume) {
    if (this.masterGain) {
      this.masterGain.gain.value = volume * 0.1; // Keep background music subtle
    }
  }
}

class AudioPlayer {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.currentTrack = null;
    this.volume = 0.3; // Default volume 30%
    this.proceduralGenerator = new ProceduralMusicGenerator();
    this.usingProcedural = false;
  }

  // Initialize audio with track (fallback to procedural if file doesn't exist)
  async loadTrack(trackUrl, trackType = 'LOFI_CALM') {
    try {
      if (this.audio) {
        this.audio.pause();
      }
      
      // Try to load the actual audio file
      this.audio = new Audio(trackUrl);
      this.audio.loop = true;
      this.audio.volume = this.volume;
      this.currentTrack = trackUrl;
      this.usingProcedural = false;
      
      // Handle audio events
      this.audio.addEventListener('canplaythrough', () => {
        console.log('Audio loaded successfully');
      });
      
      this.audio.addEventListener('error', () => {
        console.log('Audio file not found, using procedural generation');
        this.useProcedural(trackType);
      });
      
    } catch {
      console.log('Loading audio file failed, using procedural generation');
      this.useProcedural(trackType);
    }
  }

  useProcedural(trackType) {
    this.usingProcedural = true;
    this.currentTrack = `procedural_${trackType}`;
    this.audio = null;
  }

  // Play the current track (procedural or file-based)
  async play() {
    if (this.usingProcedural) {
      // Use procedural generation
      if (this.currentTrack.includes('LOFI_CALM') || this.currentTrack.includes('AMBIENT')) {
        await this.proceduralGenerator.startLofiAmbient();
      } else if (this.currentTrack.includes('NATURE_SOUNDS')) {
        await this.proceduralGenerator.startNatureSounds();
      }
      this.isPlaying = true;
      console.log('Procedural audio playing');
    } else if (this.audio && !this.isPlaying) {
      // Use audio file
      const playPromise = this.audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            console.log('Audio file playing');
          })
          .catch(error => {
            console.error('Play failed:', error);
            // Fallback to procedural
            this.useProcedural('LOFI_CALM');
            this.play();
          });
      }
    }
  }

  // Pause the current track
  pause() {
    if (this.usingProcedural) {
      this.proceduralGenerator.stop();
      this.isPlaying = false;
      console.log('Procedural audio paused');
    } else if (this.audio && this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      console.log('Audio file paused');
    }
  }

  // Toggle play/pause
  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  // Set volume (0.0 to 1.0)
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.usingProcedural) {
      this.proceduralGenerator.setVolume(this.volume);
    } else if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  // Stop and reset
  stop() {
    if (this.usingProcedural) {
      this.proceduralGenerator.stop();
    } else if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.isPlaying = false;
  }

  // Get current playing status
  getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      volume: this.volume
    };
  }
}

// Create singleton instance
const audioPlayer = new AudioPlayer();

// Predefined tracks (URLs would be actual audio files)
export const AUDIO_TRACKS = {
  LOFI_CALM: '/audio/lofi-calm.mp3',
  NATURE_SOUNDS: '/audio/nature-sounds.mp3',
  AMBIENT: '/audio/ambient.mp3'
};

// Helper functions
export const playBackgroundMusic = async (trackKey = 'LOFI_CALM') => {
  const trackUrl = AUDIO_TRACKS[trackKey];
  if (trackUrl) {
    await audioPlayer.loadTrack(trackUrl, trackKey);
    await audioPlayer.play();
  }
};

export const pauseBackgroundMusic = () => {
  audioPlayer.pause();
};

export const toggleBackgroundMusic = async (trackKey = 'LOFI_CALM') => {
  if (!audioPlayer.currentTrack) {
    const trackUrl = AUDIO_TRACKS[trackKey];
    if (trackUrl) {
      await audioPlayer.loadTrack(trackUrl, trackKey);
    }
  }
  
  return audioPlayer.toggle();
};

export const setMusicVolume = (volume) => {
  audioPlayer.setVolume(volume);
};

export const getMusicStatus = () => {
  return audioPlayer.getStatus();
};

// React hook for music control
export const useMusicPlayer = (initialTrack = 'LOFI_CALM') => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const toggleMusic = useCallback(async () => {
    const playing = await toggleBackgroundMusic(initialTrack);
    setIsPlaying(playing);
  }, [initialTrack]);
  
  const stopMusic = useCallback(() => {
    audioPlayer.stop();
    setIsPlaying(false);
  }, []);
  
  const changeVolume = useCallback((volume) => {
    setMusicVolume(volume);
  }, []);
  
  const changeTrack = useCallback(async (trackKey) => {
    audioPlayer.stop();
    await playBackgroundMusic(trackKey);
    setIsPlaying(true);
  }, []);
  
  useEffect(() => {
    // Cleanup on unmount
    return () => {
      audioPlayer.stop();
    };
  }, []);
  
  return {
    isPlaying,
    toggleMusic,
    stopMusic,
    changeVolume,
    changeTrack,
    status: getMusicStatus()
  };
};

export default audioPlayer;
