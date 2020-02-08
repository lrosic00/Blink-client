import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

//Redux
import { connect } from "react-redux";
import { getBlink, clearErrors } from "../../redux/actions/dataActions";

//MUI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//Icons
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";

const styles = theme => ({
	...theme.spreadThis,

	profileImage: {
		maxWidth: 200,
		height: 200,
		borderRadius: "50%",
		objectFit: "cover"
	},
	dialogContent: {
		padding: 20
	},
	closeButton: {
		position: "absolute",
		left: "91%",
		// top: "4%",
		color: "#ef6c00"
	},
	expandButton: {
		position: "absolute",
		left: "90%"
	},
	spinnerDiv: {
		textAlign: "center",
		marginTop: 50,
		marginBottom: 50
	}
});

class BlinkDialog extends Component {
	state = {
		open: false,
		oldPath: "",
		newPath: ""
	};

	componentDidMount() {
		if (this.props.openDialog) {
			this.handleOpen();
		}
	}

	handleOpen = () => {
		let oldPath = window.location.pathname;
		const { username, blinkId } = this.props;
		const newPath = `/users/${username}/blink/${blinkId}`;

		if (oldPath === newPath) oldPath = `/users/${username}`;

		window.history.pushState(null, null, newPath);

		this.setState({ open: true, oldPath, newPath });
		this.props.getBlink(this.props.blinkId);
	};
	handleClose = () => {
		window.history.pushState(null, null, this.state.oldPath);
		this.setState({ open: false });
		this.props.clearErrors();
	};
	render() {
		const {
			classes,
			blink: {
				blinkId,
				body,
				createdAt,
				likeCount,
				commentCount,
				userImage,
				username,
				comments
			},
			UI: { loading }
		} = this.props;

		const dialogMarkup = loading ? (
			<div className={classes.spinnerDiv}>
				<CircularProgress size={200} thickness={2} />
			</div>
		) : (
			<Grid container spacing={5}>
				<Grid item sm={5}>
					<img src={userImage} alt="Profile" className={classes.profileImage} />
				</Grid>
				<Grid item sm={7}>
					<Typography
						component={Link}
						color="primary"
						variant="h5"
						to={`/users/${username}`}
					>
						@{username}
					</Typography>
					<hr className={classes.invisibleSeperator} />
					<Typography variant="body2" style={{ color: "#ffd600" }}>
						{dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
					</Typography>
					<hr className={classes.invisibleSeperator} />
					<Typography variant="body1">{body}</Typography>
					<LikeButton blinkId={blinkId} />
					<span>{likeCount} likes</span>

					<MyButton tip="comments">
						<ChatIcon color="primary" />
					</MyButton>
					<span>{commentCount} comments</span>
				</Grid>
				<hr className={classes.visibleSeperator} />
				<CommentForm blinkId={blinkId} />
				<Comments comments={comments} />
			</Grid>
		);
		return (
			<>
				<MyButton
					onClick={this.handleOpen}
					tip="Expand blink"
					tipClassName={classes.expandButton}
				>
					<UnfoldMore color="primary" />
				</MyButton>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<MyButton
						tip="Close"
						onClick={this.handleClose}
						tipClassName={classes.closeButton}
					>
						<CloseIcon />
					</MyButton>
					<DialogContent className={classes.dialogContent}>
						{dialogMarkup}
					</DialogContent>
				</Dialog>
			</>
		);
	}
}

BlinkDialog.propTypes = {
	getBlink: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	blinkId: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	blink: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	blink: state.data.blink,
	UI: state.UI
});

const mapActionToProps = {
	getBlink,
	clearErrors
};
export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(BlinkDialog));
