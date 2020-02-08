import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import MyButton from "../../util/MyButton";

//Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

//Redux
import { connect } from "react-redux";
import { deleteBlink } from "../../redux/actions/dataActions";

//MUI stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const styles = {
	deleteButton: {
		position: "absolute",
		left: "90%"
	}
};

class DeleteBlink extends Component {
	state = {
		open: false
	};
	handleOpen = () => {
		this.setState({
			open: true
		});
	};
	handleClose = () => {
		this.setState({
			open: false
		});
	};
	deleteBlink = () => {
		this.props.deleteBlink(this.props.blinkId);
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;

		return (
			<>
				<MyButton
					tip="Delete blink"
					onClick={this.handleOpen}
					btnClassName={classes.deleteButton}
				>
					<DeleteOutline color="secondary" />
				</MyButton>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>Are you sure you want to delete this blink?</DialogTitle>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.deleteBlink} color="secondary">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	}
}

DeleteBlink.propTypes = {
	deleteBlink: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	blinkId: PropTypes.string.isRequired
};

export default connect(null, { deleteBlink })(withStyles(styles)(DeleteBlink));
