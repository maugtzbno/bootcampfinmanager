import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import API from "../../utils"

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

export default function AlignItemsList(props) {
    const classes = useStyles();
    const [news, setNews] = useState([]);
    useEffect(() => {
        API.getTwits(props.ticker).then(x => {

            console.log("docs twitter", x.data)
            setNews(x.data)
        });
    }, [props.ticker]
    );

    return (
        <List className={classes.root}>
            {news.filter(n=>n.sent!==0).map(n => {
                return(
                <div>
                <ListItem alignItems="flex-start" href={n.web_url}>
                    <ListItemText
                        primary={"Sentiment Analysis: "+ n.sent}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Twitter 
                                </Typography>
                                {n.text}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                </div>)
            })}
        </List>
    );
}
