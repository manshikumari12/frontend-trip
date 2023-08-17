import  { useState } from 'react';

const PostData = () => {
 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [destination, setDestination] = useState('');
    const [travelers, setTravelers] = useState(1);
    const [budget, setBudget] = useState(0);

  
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            name,
            email,
            destination,
            travelers,
            budget,
        };

        try {
        
            const response = await fetch('https://tired-pike-hem.cyclic.cloud/trip/trippost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData); 
             
                setName('');
                setEmail('');
                setDestination('');
                setTravelers(1);
                setBudget(0);
            } else {
                console.error('Error submitting form:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <h2>Post Travel Data</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                    <option value="">Select Destination</option>
                    <option value="India">India</option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europe</option>
                    <option value="America">America</option>
                </select>
                <input type="number" placeholder="No. of Travelers" value={travelers} onChange={(e) => setTravelers(e.target.value)} />
                <input type="number" placeholder="Budget Per Person" value={budget} onChange={(e) => setBudget(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PostData;
