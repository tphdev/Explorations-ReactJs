var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    React = require('react'),
    AddApp = require('./reactComponentMixin.jsx');

import {NotificationComponent} from './notification-system.js'
import {DatePickerComponent} from './datepicker.js'
import {SelectComponent} from './r-select.js'
import {MyDataTable} from './fixed-data-table.js'





var Router = Backbone.Router.extend({
    initialize: function() {
        Backbone.history.start()
    },

    routes: {
        'fixed-data-table': 'fixedTable',
        'react-select': 'reactSelect',
        'react-datepicker': 'reactDatepicker',
        'react-notification-system': 'reactNotification',
        '*default': 'home'
    },

    home: function() { 
        window.location.hash = ""
         var theMsg= "these are props passed in";
         

         React.render(
            <AddApp />,
            document.querySelector('.container')
        )
    },

    reactNotification: function(){
        console.log('hiiiie')
        React.render(
            <NotificationComponent/>,
            document.querySelector('.container')
        )
    },

    reactDatepicker: function(){
        React.render(
            <DatePickerComponent/>,
            document.querySelector('.container')
        )
    },

    reactSelect: function(){
        var myOptions = [
            { value: 'tx', label: 'TX' },
            { value: 'ut', label: 'Utah' },
            { value: 'al', label: 'Alabama' },
            { value: 'ny', label: 'New York' },
            { value: 'or', label: 'Oregon' }    
        ];

        React.render(

            <SelectComponent options={myOptions} defaultVal='tx'/>,
            document.querySelector('.container')
        )
    },

    fixedTable: function(){
        React.render(
            <MyDataTable/>,
            document.querySelector('.container')
            )

        var getUserGHProfile = function(user){
            console.log(`https://api.github.com/users/${user}`)
            return $.getJSON(`https://api.github.com/users/${user}`)
        }
        var users = [
            'APartingGlass',
            'cjros',
            't3patterson',
            'paulesaad',
            'matthiasak'
        ]

        var getRequestsBatch = users.map(function(user){
            return getUserGHProfile(user)
        })

        $.when.apply($,getRequestsBatch)
            .then(function(){
                var slice = Array.prototype.slice;
                console.log(arguments);
                var argsArray = slice.call(arguments);

                var userDataProps = argsArray.map(function(userData){
                    return [
                        userData[0].avatar_url,
                        userData[0].login,
                        userData[0].name,
                        userData[0].location,
                        userData[0].followers,
                        userData[0].following
                    ]
                })

                console.log(userDataProps)

                React.render(   
                    <MyDataTable rows={userDataProps} />,
                    document.querySelector('.container')
                    )
            })
    }
})

export default Router

//Downed
//-------------
//react date-picker
//react-select (forms)
//react-notification

//Left to down
//--------------
//react data-table: http://facebook.github.io/fixed-data-table/
//google react maps: http://istarkov.github.io/google-map-react/map/main/
// 