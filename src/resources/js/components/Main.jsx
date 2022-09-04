import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';

const Main = () => {
    // Sets initial state for tickets to empty array
    const [tickets, setTickets] = useState([]);

    // Call this function to get tickets data
    const getTickets = () => {
        /* fetch API in action */
        fetch('/api/tickets')
            .then(response => {
                return response.json();
            })
            .then(products => {
                //Fetched product is stored in the state
                setTickets(products);
            });
    };

    /*useEffect is a lifecycle hook
   * that gets called after the component is rendered
   */

    useEffect(() => {
        getTickets();
    }, []);

    // Render the tickets
    const renderTickets = () => {
        return tickets.map(ticket => {
            return (
                /* When using list you need to specify a key
                 * attribute that is unique for each list item
                */
                <li key={ticket.id} >{ ticket.title }</li>
            );
        })
    };

    return(
        <div>
            <ul>
                { renderTickets() }
            </ul>
        </div>
    )
}

export default Main
