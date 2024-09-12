import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CampaignForm from './CampaignForm';
import CampaignItem from './CampaignItem';

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [editingCampaign, setEditingCampaign] = useState(null);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = () => {
        axios.get('http://localhost:8080/api/campaigns')
            .then(response => setCampaigns(response.data))
            .catch(error => console.error(error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/campaigns/${id}`)
            .then(() => fetchCampaigns())
            .catch(error => console.error(error));
    };

    const handleEdit = (campaign) => {
        setEditingCampaign(campaign);
    };

    const handleSuccess = () => {
        setEditingCampaign(null);
        fetchCampaigns();
    };

    return (
        <div>
            <h2>Campaign List</h2>
            <ul>
                {campaigns.map(campaign => (
                    <CampaignItem
                        key={campaign.id}
                        campaign={campaign}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
            <CampaignForm campaignId={editingCampaign?.id} onSuccess={handleSuccess} />
        </div>
    );
};

export default CampaignList;
