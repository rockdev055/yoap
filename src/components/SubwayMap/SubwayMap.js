import React, { Component } from 'react'
import pinchZoom from 'pinch-zoom'
import { inject, observer } from 'mobx-react'
import { NavContainer } from 'containers'
import { Modal, Svg, Button } from 'components'
import { classNames, bindWheel } from 'helpers'
import s from './SubwayMap.sass'


const mapStateToProps = ({device: {support, height, navHeight}}) => ({
  touchable: support && support.touch,
  height: `${height - navHeight}px`
});

@inject(mapStateToProps) @observer
export default class SubwayMap extends Component {
  state = {selected: []};

  itemClassName = 'subway_map__item';
  activeItemClassName = 'subway_map__item--active';
  dur = .3; ease = Cubic.easeOut;
  min = 1; max = 3; step = .5;

  scale = 1;
  startScale = 1;

  componentWillMount() {
    if (this.props.selected) {
      this.setState({
        selected: this.props.selected
      })
    }
  }
  componentDidMount() {
    setTimeout(this.initMap, 300);
  }

  initMap = () => {
    this.touchInit();
    this.dragInit();
    this.wheelInit();
    this.applyStyles();
  };

  applyClasses = () => {
    const { itemClassName, activeItemClassName } = this;
    const { selected } = this.state;
    const gElements = [...this.map.querySelector('svg').querySelectorAll('g')];

    gElements.forEach(item => {
      const attr = item.getAttribute('data:subway-station');
      const id = item.getAttribute('id');
      const isActive = !!selected.find(item => item === id);

      if (attr && JSON.parse(attr)) {
        item.setAttribute(
          'class',
          classNames(
            itemClassName,
            isActive && activeItemClassName
          )
        );
      }
    })
  };
  applyStyles = () => {
    const id = 'subway-map-styles';
    this.applyClasses();
    if (document.querySelector(`#${id}`))
      return;

    const { itemClassName, activeItemClassName } = this;
    const style = document.createElement('style');
    style.setAttribute('id', id);
    style.innerHTML = `
      g.${itemClassName} {
        pointer-events: bounding-box;
        transition: opacity .15s ease-in-out;
        cursor: pointer;
      }
      g.${itemClassName}:hover {
        opacity: .6;
      }
      g.${activeItemClassName} * {
        fill: inherit !important;
      }
      g.${activeItemClassName} {
        opacity: 1 !important;
        fill: #4A90E2;
      }
    `;

    document.head.appendChild(style);
  };

  dragInit = () => {
    if (this.props.touchable)
      return;

    Draggable.create(this.map, {
      type:"x,y",
      edgeResistance:0.65,
      bounds: this.wrapper,
      throwProps:true,
      autoScroll:true,
      zIndexBoost: false
    });

    TweenMax.set(this.map, {
      y: '50%'
    })
  };
  touchInit = () => {
    this.pinchZoom = pinchZoom(this.map, {
      draggable: this.props.touchable,
      maxScale: this.max
    })
  };
  zoomScale = (y, prev, min, max, step) => {
    if (y < 0) {
      if (prev <= min) {
        return min;
      }

      return prev - step;
    }

    if (prev >= max) {
      return max;
    }

    return prev + step;
  };

  zoom = y => {
    const {
      dur, ease, step,
      min, max
    } = this;

    const scale = this.scale =
      this.zoomScale(y, this.scale, min, max, step);

    TweenMax.to(this.map, dur, {
      scale,
      ease
    });
  };

  wheelInit = () => {
    bindWheel.on(this.wrapper, e => {
      const delta = e.deltaY || e.detail || e.wheelDelta;
      this.zoom(delta)
    })
  };

  getMapRef = b => this.map = b;
  getWrapperRef = b => this.wrapper = b;

  mapClickHandler = ({target}) => {
    const { itemClassName } = this;

    let block = target;
    const tagName = block.tagName.toLowerCase();

    if (tagName !== 'g') {
      block = block.closest(`.${itemClassName}`)
    }

    if (!block)
      return;

    const className = block.getAttribute('class') || '';
    const id = block.getAttribute('id');

    if (className.indexOf(itemClassName) !== -1) {
      this.triggerStation(id, block);
    }
  };

  triggerStation = (id, node) => {
    const {
      itemClassName, activeItemClassName,
      state: {selected}
    } = this;
    const index = selected.findIndex(
      item => item === id
    );

    if (index >= 0) {
      node.setAttribute('class', itemClassName);

      return this.setState({
        selected: selected.filter(item => item !== id)
      }, this.onChange)
    }

    node.setAttribute(
      'class',
      classNames(itemClassName, activeItemClassName)
    );

    return this.setState({
      selected: [
        ...selected,
        id
      ]
    }, this.onChange)
  };

  onChange = () => {
    if (this.props.onChange) {
      this.props.onChange(
        this.state.selected
      );
    }
  };

  dropSelected = () => {
    this.setState({selected: []}, () => {
      this.onChange(); this.applyClasses();
    });
  };


  render() {
    const {
      props: {src, onClose, height},
      state: {selected},
      getMapRef,
      getWrapperRef,
      mapClickHandler,
      dropSelected
    } = this;

    const selectedLength = selected.length;

    return (
      <Modal getRef={getWrapperRef}
             overlayClassName={s.overlay}
             style={{height}} onContextMenu={onClose}
             className={s.modal}>
        <NavContainer>
          <Button type="text" nooffsets onClick={dropSelected}>
            {selectedLength ? `???????????????? (${selectedLength})` : '???????????????? ??????????????'}
          </Button>
          <Button type="light" onClick={onClose}
                  className={s.button} rounded
                  smallPadding>
            ????????????
          </Button>
        </NavContainer>
        <Svg getRef={getMapRef}
             onClick={mapClickHandler}
             className={s.map} src={src}/>
      </Modal>
    )
  }
}

