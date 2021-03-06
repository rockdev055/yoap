import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Container, Content, FlexGrid, Link, Button, Logo } from 'components'
import { classNames } from 'helpers'
import s from './Nav.sass'

@observer
export default class Nav extends Component {
  dur = .3; ease = Cubic.easeOut;

  isWide = () => this.props.width >= 1870;

  hide = () => {
    const { dur, ease } = this;
    if (this.isWide()) {
      if (this.links)
        TweenMax.to(this.links, dur, {
          opacity: 0,
          ease
        });

      return false;
    }

    TweenMax.to(this.wrapper, dur, {
      opacity: 0,
      display: 'none',
      ease
    })
  };
  show = () => {
    const { dur, ease } = this;
    if (this.isWide()) {
      TweenMax.set(this.wrapper, {
        opacity: 1,
        display: 'block'
      });
      if (this.links)
        TweenMax.to(this.links, dur, {
          opacity: 1,
          ease
        });

      return false;
    }

    TweenMax.to(this.wrapper, dur, {
      opacity: 1,
      display: 'block',
      ease
    })
  };

  trigger = props => {
    if ((props || this.props).hidden) {
      this.hide();
    } else {
      this.show();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.hidden !== this.props.hidden) {
      this.trigger(nextProps);
    }
  }
  componentDidMount() {
    this.trigger();
  }

  getLinksRef = b => this.links = b;
  getNavRef = b => {
    this.wrapper = b;

    if (this.props.getRef) {
      this.props.getRef(b);
    }
  };

  getTheme = (full, theme) => {
    if (full) {
      return theme;
    }

    return {
      ...theme,
      backgroundColor: 'transparent'
    }
  };

  render() {
    const { links, full, name, children, className, theme, config, isLogout } = this.props;
    const isCustom = !!children;
    const { isCustomMainButton, mainButton } = config;

    const styles = this.getTheme(full, theme);

    return (
      <nav className={classNames(s.nav, className, full && s.nav_showed)}
           style={styles}
           ref={this.getNavRef}>
        <FlexGrid justify="space-between" align="center"
                  tag={Container} type="full" className={s.wrapper}>
          <Link className={s.logo__wrapper} to="/">
            <Logo className={s.logo} />
            {!isCustom && <Content nooffsets className={s.city} regular>??????????-??????????????????</Content>}
          </Link>
          <div className={s.links}>
            {!isCustom && <div ref={this.getLinksRef} className={s.links__wrapper}>
              {links.map(({to, content}, key) => (
                <Link regular className={s.item} to={to} key={key}>
                  {content}
                </Link>
              ))}
            </div>}
            {!isCustomMainButton && !isLogout && !isCustom &&
            <Button to={name ? '/you' : '/login'} type="light"
                    className={s.button} rounded
                    smallPadding>
              {name || '??????????'}
            </Button>}
            {isCustomMainButton && mainButton &&
            <Button to={mainButton.to} type="light"
                    className={s.button} rounded
                    onClick={mainButton.onClick}
                    smallPadding>{mainButton.content}</Button>}
            {!isCustomMainButton && isLogout &&
            <Button to="/logout" type="light"
                    className={s.button} rounded
                    smallPadding>??????????</Button>}
            {children}
          </div>
        </FlexGrid>
      </nav>
    )
  }
}

