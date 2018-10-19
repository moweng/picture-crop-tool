
export const resize = (size) => {
  let viewWidth
  const dpr = window.devicePixelRatio;
  const dataDpr = document.documentElement.getAttribute('data-dpr');
  const ratio = dataDpr ? (dpr / dataDpr) : dpr;

  try {
    var html = document.querySelector('html');
    viewWidth = +(html.getAttribute('style').match(/(\d+)/) || [])[1];
  } catch(e) {
    const w = html.offsetWidth;
    if (w / dpr > 540) {
      viewWidth = 540 * dpr / 10;
    } else {
      viewWidth = w / 10;
    }
  }

  viewWidth = viewWidth * ratio;

  if (Number(viewWidth) >= 0 && typeof viewWidth === 'number') {
    return (size * viewWidth) / 75 
  } else {
    return size
  }
}

// Get image format
const getFormat = ({ format, fallback }) => {
  const isFormat = /^(jpg|jpeg|png|gif)$/

  if (isFormat.test(format)) {
    return `format/${format}/`;
  }
  return isFormat.test(fallback) ? `format/${fallback}/` : '';
}

// Get image size
const getSize = ({ width, height, adapt }) => {

  let w, h;
  if(width) {
    w = adapt !== false ? resize(width) : width;
  }else {
    w = document.documentElement.clientWidth;
  }

  if(height) {
    h = adapt !== false ? resize(height) : height;
  }

  const thumb = 'thumbnail/';
  const cover = `${w}x${h}`;



  if (width && height) {
    return `${thumb}!${cover}r/gravity/Center/crop/${cover}/`;
  }
  if (width) {
    return `${thumb}${w}x/`;
  }
  if (height) {
    return `${thumb}x${h}/`;
  }

  //默认以宽来裁剪
  return `${thumb}${w}x/`
}


// Get image size
export const getSrc = ({
  source, adapt,
  width, height, quality,
  format, fallback,
  urlFormatter,
} = {}) => {

  if (!source || typeof source !== 'string') {
    return '';
  }

  let queryParamsIndex = source.indexOf('?');
  if(queryParamsIndex > 0) {
    source = source.slice(0, queryParamsIndex);
  };
  const _quality = typeof quality === 'number' ? `quality/${quality}/` : ''
  const _format = getFormat({ format, fallback })
  const _size = getSize({ width, height, adapt })
  const params = `${_quality}${_format}${_size}`
  let src = source + (params ? `?imageMogr/${params}` : '')
  if (typeof urlFormatter === 'function') {
    src = urlFormatter(src);
  }
  return src
}


export function getQueryName(name, search){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    if(process.browser) {
        var r;
        if(search) {
          r = search.substr(1).match(reg);
        } else {
          r = window.location.search.substr(1).match(reg);
        }
        if(r !== null) {
            return  unescape(r[2]);
        }
    }
    return null;
}


export function isArray(o){
    return Object.prototype.toString.call(o) === '[object Array]';
}