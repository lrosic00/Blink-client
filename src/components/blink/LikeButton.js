import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { likeBlink, unlikeBlink } from "../../redux/actions/dataActions";

//Icons
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

export class LikeButton extends Component {
	likedBlink = () => {
		if (
			this.props.user.likes &&
			this.props.user.likes.find(like => like.blinkId === this.props.blinkId)
		) {
			return true;
		} else {
			return false;
		}
	};
	likeBlink = () => {
		this.props.likeBlink(this.props.blinkId);
	};
	unlikeBlink = () => {
		this.props.unlikeBlink(this.props.blinkId);
	};

	render() {
		const { authenticated } = this.props.user;
		const likeButton = !authenticated ? (
			<Link to="/login">
				<MyButton tip="Like">
					<FavoriteBorder color="primary" />
				</MyButton>
			</Link>
		) : this.likedBlink() ? (
			<MyButton tip="Dislike" onClick={this.unlikeBlink}>
				<FavoriteIcon color="primary" />
			</MyButton>
		) : (
			<MyButton tip="Like" onClick={this.likeBlink}>
				<FavoriteBorder color="primary" />
			</MyButton>
		);

		return likeButton;
	}
}

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	blinkId: PropTypes.string.isRequired,
	likeBlink: PropTypes.func.isRequired,
	unlikeBlink: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = {
	likeBlink,
	unlikeBlink
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
