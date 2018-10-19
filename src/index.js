import React, { Component } from 'react';
import { getQueryName, getSrc, resize, isArray } from './util';

class ImageLoaderV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
    }
    this.registImageNode = this.registImageNode.bind(this);
    this.getSrc = this.getSrc.bind(this);
    this.onLoadImage = this.onLoadImage.bind(this);
    this.onImageError = this.onImageError.bind(this);

    this.images = {};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      images: nextProps.images
    });
  }

  registImageNode(node, index){
    this.images[index] = node;
  }

  getSrc(src){
    
    let source = getSrc({...this.props, source: src});
    return  source;
  }

  onLoadImage(index){
    if (this.props.isPreloadMode === true) {
      return;
    }


    const imageNode = this.images[index];
    if(imageNode){
      imageNode.style.opacity = 1;
    }
  }

  onImageError (index){
    const { errorImage } = this.props;
    console.log('error:', errorImage)
    const imageNode = this.images[index];
    console.log('imageNode:', imageNode);
    if(imageNode && errorImage && !imageNode.hasLoaded){
      imageNode.src = errorImage;
      imageNode.hasLoaded = true;
    }
  }

  render() {
    const images = this.state.images;
    let imagesArr;
    if(!images) {
      return '';
    }

    if(!isArray(images)) {
      imagesArr = [images];
    }else {
      imagesArr = images;
    }
    if (imagesArr.length <= 0) {
      return '';
    }

    const { imageStyle } = this.props;


    const self = this;

    let imageWidth;
    if (imageStyle && imageStyle.width) {
      imageWidth = imageStyle.width;
    }

    let vm = this;

    const imagesPanel = imagesArr.map(function (image, index) {

      let width, height;

      let style = {
        opacity: '0',
        transition: 'opacity 0.8s'
      }

      let imageUrl = vm.getSrc(image);

      if (imageWidth) {

        const search = imageUrl.substr(imageUrl.indexOf('?'));

        if (!width) {
          width = getQueryName('w', search);
        }
        if (!height) {
          height = getQueryName('h', search);
        }

        if (width && height) {
          let imageHeight = height * 1.0 / width * imageWidth;
          let remHeight = resize(imageHeight);
          style.minHeight = remHeight + 'rem';
        }
      }

      return (
        <img
          key={image + index}
          ref={ ref => { self.registImageNode(ref, index) } }
          src={ imageUrl }
          onLoad={self.onLoadImage.bind(vm, index)}
          onError={self.onImageError.bind(vm, index)}
          style={style}
        />
      )
    });

    return imagesPanel;
  }
}

export default ImageLoaderV2;

