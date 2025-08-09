// Modern Sound Effects untuk MindClear+
import { getMusicStatus } from './audioPlayer';

class SoundEffects {
  constructor() {
    this.context = null;
    this.masterGain = null;
    this.enabled = true;
    this.lastTypeCall = 0;
    this.initAudio();
  }

  async initAudio() {
    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      this.masterGain.gain.value = 0.3; // Master volume
    } catch {
      console.log('Audio context not supported');
    }
  }

  // Toggle sound effects on/off
  toggleSounds() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Resume audio context if suspended (required for modern browsers)
  async resumeContext() {
    if (this.context && this.context.state === 'suspended') {
      await this.context.resume();
    }
  }

  // Intelligent volume adjustment based on background music
  getAdjustedVolume(baseVolume) {
    const musicStatus = getMusicStatus();
    if (musicStatus.isPlaying) {
      // Reduce UI sound volume when background music is playing
      return baseVolume * 0.7;
    }
    return baseVolume;
  }

  // Enhanced tone creation with better envelopes
  createTone(frequency, duration, type = 'sine', volume = 0.1) {
    if (!this.context || !this.enabled) return;

    const adjustedVolume = this.getAdjustedVolume(volume);
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    // Advanced ADSR envelope
    const now = this.context.currentTime;
    const attack = 0.02;
    const decay = 0.1;
    const sustain = adjustedVolume * 0.7;
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(adjustedVolume, now + attack);
    gainNode.gain.linearRampToValueAtTime(sustain, now + attack + decay);
    gainNode.gain.setValueAtTime(sustain, now + attack + decay);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  // Modern UI click sound with harmonic
  async playClick() {
    await this.resumeContext();
    this.createTone(800, 0.08, 'square', 0.15);
    setTimeout(() => this.createTone(1200, 0.04, 'sine', 0.1), 30);
  }

  // Enhanced success notification sound
  async playSuccess() {
    await this.resumeContext();
    // Major chord progression for positive feedback
    this.createTone(523.25, 0.2, 'sine', 0.12); // C5
    setTimeout(() => this.createTone(659.25, 0.2, 'sine', 0.1), 100); // E5
    setTimeout(() => this.createTone(783.99, 0.3, 'sine', 0.08), 200); // G5
    setTimeout(() => this.createTone(1046.50, 0.2, 'sine', 0.06), 350); // C6
  }

  // Improved typing sound with variation
  async playType() {
    await this.resumeContext();
    const frequencies = [380, 420, 450, 400, 390, 440];
    const freq = frequencies[Math.floor(Math.random() * frequencies.length)];
    this.createTone(freq, 0.04, 'square', 0.08);
  }

  // Enhanced whoosh sound for transitions
  async playWhoosh() {
    if (!this.context || !this.enabled) return;
    await this.resumeContext();

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    oscillator.type = 'sawtooth';
    filter.type = 'lowpass';
    filter.Q.value = 5;
    
    const now = this.context.currentTime;
    // Enhanced sweep effect
    oscillator.frequency.setValueAtTime(1200, now);
    oscillator.frequency.exponentialRampToValueAtTime(80, now + 0.6);
    
    filter.frequency.setValueAtTime(1500, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.6);
    
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    
    oscillator.start(now);
    oscillator.stop(now + 0.6);
  }

  // Enhanced burn effect sound
  async playBurn() {
    if (!this.context || !this.enabled) return;
    await this.resumeContext();

    // Create more realistic crackling effect
    const bufferSize = this.context.sampleRate * 1.5;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate crackling noise with varying intensity
    for (let i = 0; i < bufferSize; i++) {
      const decay = Math.exp(-i / (bufferSize * 0.2));
      const crackle = Math.random() < 0.1 ? Math.random() * 0.5 : 0;
      data[i] = (Math.random() * 2 - 1) * decay * 0.3 + crackle;
    }
    
    const noise = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gainNode = this.context.createGain();
    
    noise.buffer = buffer;
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1500, this.context.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, this.context.currentTime + 1.5);
    filter.Q.value = 2;
    
    gainNode.gain.setValueAtTime(0.1, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 1.5);
    
    noise.start(this.context.currentTime);
    noise.stop(this.context.currentTime + 1.5);
  }

  // Enhanced notification ding
  async playNotification() {
    await this.resumeContext();
    // Soft bell-like tone
    this.createTone(800, 0.15, 'sine', 0.1);
    setTimeout(() => this.createTone(1000, 0.2, 'sine', 0.08), 100);
    setTimeout(() => this.createTone(1200, 0.1, 'sine', 0.05), 200);
  }

  // New: Emotion-based ambient sounds
  async playEmotionalTone(emotion) {
    await this.resumeContext();
    
    const emotionSounds = {
      bahagia: () => {
        // Bright, uplifting chord
        this.createTone(523.25, 0.5, 'sine', 0.08); // C
        this.createTone(659.25, 0.5, 'sine', 0.06); // E
        this.createTone(783.99, 0.5, 'sine', 0.04); // G
      },
      sedih: () => {
        // Minor, melancholic tone
        this.createTone(440, 0.8, 'sine', 0.06); // A
        setTimeout(() => this.createTone(523.25, 0.6, 'sine', 0.04), 200); // C
      },
      cemas: () => {
        // Dissonant, unsettling
        this.createTone(660, 0.3, 'triangle', 0.05);
        setTimeout(() => this.createTone(669, 0.3, 'triangle', 0.05), 100);
      },
      stres: () => {
        // Intense, rapid pulses
        for (let i = 0; i < 3; i++) {
          setTimeout(() => this.createTone(800, 0.1, 'square', 0.06), i * 150);
        }
      },
      marah: () => {
        // Sharp, aggressive
        this.createTone(220, 0.4, 'sawtooth', 0.08);
        setTimeout(() => this.createTone(440, 0.2, 'square', 0.06), 200);
      },
      bingung: () => {
        // Wandering, uncertain
        const frequencies = [330, 370, 440, 392];
        frequencies.forEach((freq, i) => {
          setTimeout(() => this.createTone(freq, 0.2, 'sine', 0.04), i * 200);
        });
      }
    };

    if (emotionSounds[emotion]) {
      emotionSounds[emotion]();
    }
  }

  // New: Play typing sound with throttling
  playTypeThrottled() {
    const now = Date.now();
    if (!this.lastTypeCall) this.lastTypeCall = 0;
    
    if (now - this.lastTypeCall > 100) { // Throttle to max 10 sounds per second
      this.playType();
      this.lastTypeCall = now;
    }
  }
}

// Export singleton instance
const soundEffects = new SoundEffects();
export default soundEffects;
