import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import MyButton from "../../util/MyButton";
import DeleteBlink from "./DeleteBlink";
import BlinkDialog from "./BlinkDialog";
import LikeButton from "./LikeButton";

//Icons
import ChatIcon from "@material-ui/icons/Chat";

//Redux
import { connect } from "react-redux";
import { likeBlink, unlikeBlink } from "../../redux/actions/dataActions";

//MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
	card: {
		position: "relative",
		display: "flex",
		marginBottom: 20,
		backgroundColor: "rgb(0,0,0,0.8)",
		color: "white"
	},
	image: {
		minWidth: 200
	},
	content: {
		padding: 25,
		objectFit: "cover"
	}
};
class Blink extends Component {
	render() {
		dayjs.extend(relativeTime);
		const {
			classes,
			blink: {
				body,
				createdAt,
				userImage,
				username,
				blinkId,
				likeCount,
				commentCount
			},
			user: {
				authenticated,
				credentials: { username: userHandle }
			}
		} = this.props;

		const deleteButton =
			authenticated && username === userHandle ? (
				<DeleteBlink blinkId={blinkId} />
			) : null;

		return (
			<Card className={classes.card}>
				<CardMedia
					image={userImage}
					title="Profile image"
					className={classes.image}
				/>
				<CardContent className={classes.content}>
					<Typography
						variant="h5"
						component={Link}
						to={`/users/${username}`}
						color="primary"
					>
						{username}
					</Typography>
					{deleteButton}
					<Typography variant="body2" style={{ color: "#ffd600" }}>
						{dayjs(createdAt).fromNow()}
					</Typography>
					<Typography variant="body1">{body}</Typography>
					<LikeButton blinkId={blinkId} />
					<span>{likeCount} Likes </span>
					<MyButton tip="comments">
						<ChatIcon color="primary" />
					</MyButton>
					<span>{commentCount} comments</span>
					<BlinkDialog
						blinkId={blinkId}
						username={username}
						openDialog={this.props.openDialog}
					/>
				</CardContent>
			</Card>
		);
	}
}

Blink.propTypes = {
	likeBlink: PropTypes.func.isRequired,
	unlikeBlink: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	blink: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
	user: state.user
});
const mapActionsToProps = {
	likeBlink,
	unlikeBlink
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Blink));
