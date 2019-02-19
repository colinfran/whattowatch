import React from 'react';
import { View, Image } from 'react-native';

export default class AsyncImage extends React.Component {
    //constructor to declare state and get props from parent
    constructor(props) {
        super(props)
        this.state = { loaded: false }
    }

    render() {
        const {
          placeholderColor,
            style,
            source
        } = this.props
        return (
            <View
                style={style}>
                    <Image
                        source={source}
                        resizeMode={'cover'}
                        style={[
                            {
                                position: 'absolute',
                                resizeMode: 'cover'
                            },
                            style
                        ]}
                        onLoad={this._onLoad}
                        />
                {!this.state.loaded &&
                    <Image source={require('../assets/images/placeholder.jpg')} style={style} />
                }
            </View>
        )
    }
    _onLoad = () => {
        this.setState(() => ({ loaded: true }))
    }
}
