import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

//MUI
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//Icons
import CalendarToday from "@material-ui/icons/CalendarToday";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";

const styles = theme => ({
	paper: { backgroundColor: "rgb(0,0,0,0.8)", padding: 20, color: "inherit" },
	profile: {
		"& .image-wrapper": {
			textAlign: "center",
			position: "relative"
		},
		"& .profile-image": {
			width: 200,
			height: 200,
			objectFit: "cover",
			maxWidth: "100%",
			borderRadius: "50%"
		},
		"& .profile-details": {
			textAlign: "center",
			"& span, svg": {
				verticalAlign: "middle"
			},
			"& a": {
				color: "#ffd600"
			}
		},
		"& hr": {
			border: "none",
			margin: "0 0 10px 0"
		}
	}
});

const StaticProfile = props => {
	const {
		classes,
		profile: { username, createdAt, imageUrl, bio, website, location }
	} = props;

	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={imageUrl} alt="profile" className="profile-image" />
				</div>
				<hr />
				<div className="profile-details">
					<MuiLink
						component={Link}
						to={`/users/${username}`}
						color="primary"
						variant="h5"
					>
						@{username}
					</MuiLink>
					<hr />
					{bio && <Typography variant="body2">{bio}</Typography>}
					<hr />
					{location && (
						<>
							<LocationOn color="primary" /> <span>{location}</span>
							<hr />
						</>
					)}
					{website && (
						<>
							<LinkIcon color="primary" />
							<a href={website} target="_blank" rel="noopener noreferrer">
								{` `}
								{website}
							</a>
							<hr />
						</>
					)}
					<CalendarToday color="primary" />{" "}
					<span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
				</div>
			</div>
		</Paper>
	);
};

StaticProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);
