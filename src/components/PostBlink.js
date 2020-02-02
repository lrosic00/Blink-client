import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";
//Redux
import { connect } from "react-redux";
import { postBlink } from "../redux/actions/dataActions";

//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

//Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
	...theme.spreadThis,
	submitButton: {
		position: "relative"
	},
	progressSpinner: {
		position: "absolute"
	},
	closeButton: {
		position: "absolute",
		left: "90%",
		top: "4%",
		color: "#ef6c00"
	}
});
class PostBlink extends Component {
	state = {
		open: false,
		body: "",
		errors: {}
	};
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
		if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({ body: "" });
			this.handleClose();
		}
	}
	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false, errors: {} });
	};
	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	handleSubmit = event => {
		event.preventDefault();
		this.props.postBlink({ body: this.state.body });
	};
	render() {
		const { errors } = this.state;
		const {
			classes,
			UI: { loading }
		} = this.props;
		return (
			<>
				<MyButton onClick={this.handleOpen} tip="Post a blink!">
					<AddIcon />
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
					<DialogTitle>Post a new blink</DialogTitle>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								name="body"
								type="text"
								label="Blink body goes here"
								multiline
								rows="3"
								placeholder="Blink Blink Blink"
								helperText={errors.error}
								error={errors.error ? true : false}
								className={classes.textField}
								onChange={this.handleChange}
								fullWidth
							/>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submitButton}
								disabled={loading}
							>
								Submit
								{loading && (
									<CircularProgress
										size={30}
										className={classes.progressSpinner}
									/>
								)}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</>
		);
	}
}

PostBlink.propTypes = {
	postBlink: PropTypes.func.isRequired,
	loading: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	UI: state.UI
});

export default connect(mapStateToProps, { postBlink })(
	withStyles(styles)(PostBlink)
);
