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

export default function AlignItemsList() {
    const classes = useStyles();
    const [news, setNews] = useState([]);
    useEffect(() => {
        API.getNews("APPLE").then(x => {

            console.log("docs", x.data.response.docs)
            setNews(x.data.response.docs)
        });
    }, []
    );

    return (
        <List className={classes.root}>
            {news.map(n => {
                return(
                <div>
                <ListItem alignItems="flex-start" href={n.web_url}>
                    <ListItemText
                        primary={n.lead_paragraph}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {n.source + "  "} 
                                </Typography>
                                {n.abstract}
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
