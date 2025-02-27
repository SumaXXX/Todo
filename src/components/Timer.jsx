import { Component } from 'react';

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      time: 0,
    };
  }

  componentDidMount() {
    this.interval = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isRunning && !prevState.isRunning) {
      this.interval = setInterval(() => {
        this.setState((prevState) => ({
          time: prevState.time + 1,
        }));
      }, 1000);
    } else if (!this.state.isRunning && prevState.isRunning) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startTimer = () => {
    this.setState(({
        isRunning: true
    }));
  };

  pauseTimer = () => {
    this.setState(({
        isRunning: false
    }));
  };

  render() {
    return (
      <div>
        <span class="description timer">
          <button class="icon icon-play" onClick={this.startTimer} ></button>
          <button class="icon icon-pause" onClick={this.pauseTimer}></button>
           <span className='timer-count'>{this.state.time} sec</span>
        </span>
      </div>
    );
  }
}
