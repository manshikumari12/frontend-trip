import React, { useState, useEffect } from 'react';

const RetrieveData = () => {
 
    const [travelData, setTravelData] = useState([]);

 
    const fetchData = async () => {
        try {
            const response = await fetch('https://tired-pike-hem.cyclic.cloud/trip/retrieve');
            if (response.ok) {
                const responseData = await response.json();
                setTravelData(responseData);
            } else {
                console.error('Error fetching data:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); 


    const handleDelete = async (cardId) => {
        try {
       
            const deleteResponse = await fetch(`https://tired-pike-hem.cyclic.cloud/trip/delete/${cardId}`, {
                method: 'DELETE',
            });

            if (deleteResponse.ok) {
                setTravelData(travelData.filter((card) => card._id !== cardId));
            } else {
                console.error('Error deleting card:', deleteResponse.status, deleteResponse.statusText);
            }
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    return (
        <div>
            <h2>Travel Data</h2>
            {travelData.map((card) => (
                <div key={card._id}>
                    <p>Name: {card.name}</p>
                    <p>Email: {card.email}</p>
                    <p>Destination: {card.destination}</p>
                    <p>No. of Travelers: {card.travelers}</p>
                    <p>Budget Per Person: {card.budget}</p>
                    <button onClick={() => handleDelete(card._id)}>Delete</button>
                </div>
            ))}

          


        </div>
    );
};

export default RetrieveData;
