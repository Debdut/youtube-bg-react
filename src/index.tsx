import React from 'react'
import YouTube from 'react-youtube'
import type {
  PlayerVars
} from 'react-youtube'
import styles from './styles.module.css'

interface YouTubePlayer {
  playVideo: Function
}

interface YoutubeEvent {
  target: YouTubePlayer
}

type onEvent = (event: YoutubeEvent) => void;

interface OptionalProps {
  aspectRatio ? : string,
  overlay ? : string,
  className ? : string,
  noCookie ? : boolean,

  onReady ? : onEvent,
  onEnd ? : onEvent,
  onPlay ? : onEvent,
  onPause ? : onEvent,
  onError ? : onEvent,
  onStateChange ? : onEvent,
  onPlaybackRateChange ? : onEvent,
  onPlaybackQualityChange ? : onEvent,

  playerVars ? : PlayerVars,
  style ? : object
}

export interface Props extends OptionalProps {
  videoId: string
}

interface State {
  aspectRatio: number,
  videoHeight ? : number,
  videoWidth ? : number,
  videoX ? : number,
  videoY ? : number
}

class YoutubeBg extends React.Component < Props, State > {

  container: HTMLDivElement;
  static defaultPlayerVars: PlayerVars = {
    autoplay: 1,
    controls: 0,
    rel: 0,
    showinfo: 0,
    mute: 1,
    modestbranding: 1,
    iv_load_policy: 3,
    playsinline: 1,
  }
  static defaultProps: OptionalProps = {
    aspectRatio: '16:9',
    overlay: 'false',
    noCookie: false,
    playerVars: {},
    onReady: () => {},
    onPlay: () => {},
    onPause: () => {},
    onError: () => {},
    onEnd: () => {},
  }

  constructor(props: Props) {
    super(props);

    const aspectRatio = this.props ?.aspectRatio ?.split(':') || ['1', '1'];

    this.state = {
      aspectRatio: parseInt(aspectRatio[0]) / parseInt(aspectRatio[1]),
      videoHeight: 10
    };
  }

  setContainer(container: HTMLDivElement | null) {
    if (container) {
      this.container = this.container;
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    const {
      aspectRatio
    } = this.state;
    const containerWidth = this.container ?.clientWidth || 1;
    const containerHeight = this.container ?.clientHeight || 1;
    const containerAspectRatio = containerWidth / containerHeight;

    let videoHeight = containerHeight;
    let videoWidth = containerWidth;
    let videoY = 0;
    let videoX = 0;

    if (containerAspectRatio > aspectRatio) {
      videoHeight = containerWidth / aspectRatio;
      videoY = (videoHeight - containerHeight) / -2;
    } else {
      videoWidth = containerHeight * aspectRatio;
      videoX = (videoWidth - containerWidth) / -2;
    }

    this.setState({
      videoHeight,
      videoWidth,
      videoY,
      videoX
    });
  }

  onEnd(event: YoutubeEvent) {
    event.target ?.playVideo();
    if (this.props.onEnd) {
      this.props.onEnd(event);
    }
  }

  onReady(event: YoutubeEvent) {
    event.target ?.playVideo();
    if (this.props.onReady) {
      this.props.onReady(event);
    }
  }


  render() {
    const {
      videoHeight,
      videoWidth,
      videoX,
      videoY
    } = this.state;
    const {
      style,
      children,
      className,
      overlay,
      playerVars
    } = this.props;
    const playerProps = (({
        videoId,
        onPlay,
        onPause,
        onError,
        onStateChange,
        onPlaybackRateChange,
        onPlaybackQualityChange
      }) =>
      ({
        videoId,
        onPlay,
        onPause,
        onError,
        onStateChange,
        onPlaybackRateChange,
        onPlaybackQualityChange
      }))(this.props);

    const videoOptions = {
      playerVars: {
        ...YoutubeBg.defaultPlayerVars,
        ...playerVars
      },
      host: this.props.noCookie ? 'https://www.youtube-noCookie.com' : 'https://www.youtube.com'
    };

    return (
      <div style={style} ref={this.setContainer} className={[styles.container, className].join(' ')}>
				<div>{children}</div>
				<div
					className={styles.videoContainer}
					style={{
						width: videoWidth + 'px',
						height: videoHeight + 'px',
						top: videoY + 'px',
						left: videoX + 'px'
					}}
				>
					{overlay &&
						<div className={styles.overlay} style={{ backgroundColor: overlay }}></div>}
					<YouTube
						{...playerProps}
						onReady ={this.onReady.bind(this)}
						onEnd ={this.onEnd.bind(this)}
						opts={videoOptions}
						className={styles.videoIframe}
						containerClassName={styles.videoInnerContainer}
					></YouTube>
				</div>
			</div>
    );
  }
}

export default YoutubeBg;
