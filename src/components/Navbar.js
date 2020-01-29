import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MyButton from "../util/MyButton";

//Material UI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

//Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

export class Navbar extends Component {
	render() {
		const { authenticated } = this.props;
		return (
			<AppBar className="nav-color" position="static">
				<Toolbar className="nav-container">
					{authenticated ? (
						<>
							<MyButton tip="Post a blink!">
								<AddIcon />
							</MyButton>
							<Link to="/">
								<MyButton tip="Home">
									<HomeIcon />
								</MyButton>
							</Link>
							<MyButton tip="Notifications">
								<Notifications />
							</MyButton>
						</>
					) : (
						<>
							<Button color="inherit" component={Link} to="/login">
								Login
							</Button>
							<Button color="inherit" component={Link} to="/">
								Home
							</Button>
							<Button color="inherit" component={Link} to="/signup">
								Signup
							</Button>{" "}
						</>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}
Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
