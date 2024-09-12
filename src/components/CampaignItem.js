import React from 'react';

const CampaignItem = ({ campaign, onEdit, onDelete }) => {
    return (
        <li>
            <div>
                <strong>{campaign.name}</strong> - ${campaign.bidAmount}
            </div>
            <div>
                <button onClick={() => onEdit(campaign)}>Edit</button>
                <button onClick={() => onDelete(campaign.id)}>Delete</button>
            </div>
        </li>
    );
};

export default CampaignItem;
