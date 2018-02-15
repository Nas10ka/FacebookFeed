// Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import postsActions from '../../actions/posts';
// Components
import Spinner from 'components/Spinner';
import Catcher from 'components/Catcher';
import Wall from '../../components/Wall';
import Notifications from 'components/Notifications';
import { getPosts } from '../../selectors/posts';
import Navigation from 'components/Navigation';

class Feed extends Component {
    render () {
        console.log(this.props.feedFetching);
        const {
            feedFetching,
            authFetching,
            actions,
            posts,
            profile,
            createPost,
        } = this.props;

        return (
            <Fragment>
                <Navigation />
                <Spinner spin = { feedFetching } />
                <Notifications />
                <Catcher>
                    <Wall
                        actions = { actions }
                        createPost = { createPost }
                        posts = { posts }
                        profile = { profile }
                    />
                </Catcher>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    // posts: state.posts.toJS(), //  способ преобразования из иммутбл в объект
    // posts: state.posts,
    posts:        getPosts(state),
    profile:      state.profile,
    feedFetching: state.ui.feedFetching,
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...postsActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
