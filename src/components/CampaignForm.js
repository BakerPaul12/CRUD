import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CampaignForm = ({ campaignId, onSuccess }) => {
    const [campaign, setCampaign] = useState({
        name: '',
        keywords: '',
        bidAmount: '',
        campaignFund: '',
        status: false,
        town: '',
        radius: ''
    });
    const [towns, setTowns] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch the towns from the server
        axios.get('http://localhost:8080/api/towns')
            .then(response => setTowns(response.data.map(town => town.name))) // Adjust based on your response structure
            .catch(error => console.error("There was an error fetching towns!", error));

        if (campaignId) {
            // Fetch campaign details if editing an existing campaign
            axios.get(`http://localhost:8080/api/campaigns/${campaignId}`)
                .then(response => setCampaign(response.data))
                .catch(error => console.error("There was an error fetching the campaign!", error));
        }
    }, [campaignId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaign(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, keywords, bidAmount, campaignFund, status, town, radius } = campaign;
        const newErrors = {};

        if (!name) newErrors.name = "Campaign name is required";
        if (!keywords) newErrors.keywords = "Keywords are required";
        if (!bidAmount || bidAmount <= 0) newErrors.bidAmount = "Bid amount must be greater than 0";
        if (!campaignFund || campaignFund <= 0) newErrors.campaignFund = "Campaign fund must be greater than 0";
        if (!town) newErrors.town = "Town is required";
        if (!radius || radius <= 0) newErrors.radius = "Radius must be greater than 0";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const request = campaignId
            ? axios.put(`http://localhost:8080/api/campaigns/${campaignId}`, campaign)
            : axios.post('http://localhost:8080/api/campaigns', campaign);

        request
            .then(() => {
                onSuccess();
                setCampaign({
                    name: '',
                    keywords: '',
                    bidAmount: '',
                    campaignFund: '',
                    status: false,
                    town: '',
                    radius: ''
                });
            })
            .catch(error => console.error("There was an error saving the campaign!", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Campaign Name</label>
                <input
                    type="text"
                    name="name"
                    value={campaign.name}
                    onChange={handleChange}
                    required
                />
                {errors.name && <div>{errors.name}</div>}
            </div>
            <div>
                <label>Keywords</label>
                <input
                    type="text"
                    name="keywords"
                    value={campaign.keywords}
                    onChange={handleChange}
                    required
                />
                {errors.keywords && <div>{errors.keywords}</div>}
            </div>
            <div>
                <label>Bid Amount</label>
                <input
                    type="number"
                    name="bidAmount"
                    value={campaign.bidAmount}
                    onChange={handleChange}
                    required
                />
                {errors.bidAmount && <div>{errors.bidAmount}</div>}
            </div>
            <div>
                <label>Campaign Fund</label>
                <input
                    type="number"
                    name="campaignFund"
                    value={campaign.campaignFund}
                    onChange={handleChange}
                    required
                />
                {errors.campaignFund && <div>{errors.campaignFund}</div>}
            </div>
            <div>
                <label>Status</label>
                <select
                    name="status"
                    value={campaign.status}
                    onChange={(e) => setCampaign(prevState => ({
                        ...prevState,
                        status: e.target.value === 'true'
                    }))}
                    required
                >
                    <option value={true}>On</option>
                    <option value={false}>Off</option>
                </select>
                {errors.status && <div>{errors.status}</div>}
            </div>
            <div>
                <label>Town</label>
                <select
                    name="town"
                    value={campaign.town}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a town</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                    <option value="Houston">Houston</option>
                    <option value="Phoenix">Phoenix</option>
                    <option value="Philadelphia">Philadelphia</option>
                    <option value="San Antonio">San Antonio</option>
                    <option value="San Diego">San Diego</option>
                    <option value="Dallas">Dallas</option>
                    <option value="San Jose">San Jose</option>
                </select>
                {errors.town && <div>{errors.town}</div>}
            </div>
            <div>
                <label>Radius (km)</label>
                <input
                    type="number"
                    name="radius"
                    value={campaign.radius}
                    onChange={handleChange}
                    required
                />
                {errors.radius && <div>{errors.radius}</div>}
            </div>
            <button type="submit">Save Campaign</button>
        </form>
    );
};

export default CampaignForm;
