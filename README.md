# youtube-bg-react

> Youtube video as background for HTML elements

[![NPM](https://img.shields.io/npm/v/youtube-bg-react.svg)](https://www.npmjs.com/package/youtube-bg-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save youtube-bg-react
```

## Usage

```tsx
import React, { Component } from 'react'

import YoutubeBg from 'youtube-bg-react'
import 'youtube-bg-react/dist/index.css'

class Example extends Component {
  render() {
    return <YoutubeBg videoId="<Youtube Video ID>"> { <Content> } </YoutubeBg>
  }
}
```

## License

MIT © [Debdut](https://github.com/Debdut)
