import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/thunder.svg";
import { Link } from "react-router-dom";

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//REDUX
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
//TODO fix short password input

const styles = theme => ({
	...theme.spreadThis
});

class signup extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			confirmPassword: "",
			username: "",
			errors: []
		};
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
	}
	handleSubmit = event => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			username: this.state.username
		};

		this.props.signupUser(newUserData, this.props.history);
	};
	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
	render() {
		const {
			classes,
			UI: { loading }
		} = this.props;
		const { errors } = this.state;

		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img src={AppIcon} alt="Blink" className={classes.image} />
					<Typography variant="h2" className={classes.pageTitle}>
						Signup
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email"
							helperText={errors.email}
							error={errors.email ? true : false}
							className={classes.textField}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="password"
							name="password"
							type="password"
							label="password"
							helperText={errors.password}
							error={errors.password ? true : false}
							className={classes.textField}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							label="Confirm Password"
							helperText={errors.password}
							error={errors.confirmPassword ? true : false}
							className={classes.textField}
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="username"
							name="username"
							type="text"
							label="Username"
							helperText={errors.username}
							error={errors.username ? true : false}
							className={classes.textField}
							value={this.state.username}
							onChange={this.handleChange}
							fullWidth
						/>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.button}
							disabled={loading}
						>
							Sign up
							{loading && (
								<CircularProgress
									className={classes.progress}
									size={30}
									color="primary"
								/>
							)}
						</Button>
						<br></br>
						<small>
							Already have an account? login <Link to="./login">here</Link>
						</small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

signup.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	user: state.user,
	UI: state.UI
});
export default connect(mapStateToProps, { signupUser })(
	withStyles(styles)(signup)
);
