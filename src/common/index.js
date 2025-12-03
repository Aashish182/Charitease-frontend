
const backendDomain = "https://charitease-backend.onrender.com";

const SummaryApi = {
    register :{
        url: `${backendDomain}/api/Register`,
        method : "post"
    },
    login :{
        url: `${backendDomain}/api/Login`,
        method : "post"
    },
    current_user :{
        url: `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user :{
        url: `${backendDomain}/api/userLogout`,
        method : "get"
    },
    createCampaign :{
        url: `${backendDomain}/api/createCampaign`,
        method : "post"
    },
    campaigndetail :{
        url: `${backendDomain}/api/campaignDetails`,
        method : "get"
    },
    categoryCampaign :{
        url: `${backendDomain}/api/get-categoryCampaign`,
        method: "get"
    },
    campaignDetails :{
        url: `${backendDomain}/api/campaign-details`,
        method: "post"
    },
    campaignDetailsUser :{
        url: `${backendDomain}/api/campaign-details-user`,
        method: "post"
    },
    DeleteCampaign :{
        url : `${backendDomain}/api/delete-campaign`,
        method : "post"
    },
    updateCampaign :{
        url : `${backendDomain}/api/update-campaign`,
        method : "post"
    },
    updateStory :{
        url : `${backendDomain}/api/story-update`,
        method : "post"
    },
    getUpdateStory :{
        url : `${backendDomain}/api/get-storyUpdate`,
        method : "post"
    },
    deletestory: {
        url : `${backendDomain}/api/delete-story`,
        method : 'post'
    },
    categoryWiseCampaign: {
        url : `${backendDomain}/api/category-campaign`,
        method : 'post'
    },
    allUser: {
        url: `${backendDomain}/api/all-users`,
        method: 'get'
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: 'post'
    },
    contactDetail: {
        url: `${backendDomain}/api/contact-detail`,
        method: "post"
    },
    allContact: {
        url: `${backendDomain}/api/all-contacts`,
        method: 'get'
    },
    addbank: {
        url: `${backendDomain}/api/add-bank`,
        method: 'post'
    },
    bankdetail: {
        url: `${backendDomain}/api/bank-detail`,
        method: 'post'
    },
    deletebank: {
        url: `${backendDomain}/api/delete-bank`,
        method: 'post'
    },
    makeDonation: {
        url: `${backendDomain}/api/make-donation`,
        method: 'post'
    },
    allBank: {
        url: `${backendDomain}/api/all-bank-detail`,
        method: 'get'
    },
    donationDetail: {
        url: `${backendDomain}/api/donation-detail`,
        method: 'post'
    },
    campaignuser: {
        url: `${backendDomain}/api/campaign-user`,
        method: 'post'
    },
    withdraw: {
        url: `${backendDomain}/api/Withdraw`,
        method: 'post'
    },
    changePassword: {
        url: `${backendDomain}/api/change-password`,
        method: 'post'
    }
}


export default SummaryApi;



// const backendDomain = "https://charitease-backend.onrender.com";

// const SummaryApi = {
//     register: {
//         url: `${backendDomain}/api/register`,
//         method: "post"
//     },
//     login: {
//         url: `${backendDomain}/api/login`,
//         method: "post"
//     },
//     current_user: {
//         url: `${backendDomain}/api/user-details`,
//         method: "get"
//     },
//     logout_user: {
//         url: `${backendDomain}/api/user-logout`,
//         method: "get"
//     },
//     createCampaign: {
//         url: `${backendDomain}/api/create-campaign`,
//         method: "post"
//     },
//     campaigndetail: {
//         url: `${backendDomain}/api/campaign-details`,
//         method: "get"
//     },
//     categoryCampaign: {
//         url: `${backendDomain}/api/get-category-campaign`,
//         method: "get"
//     },
//     campaignDetails: {
//         url: `${backendDomain}/api/campaign-detail`,
//         method: "post"
//     },
//     campaignDetailsUser: {
//         url: `${backendDomain}/api/campaign-user-detail`,
//         method: "post"
//     },
//     DeleteCampaign: {
//         url: `${backendDomain}/api/delete-campaign`,
//         method: "post"
//     },
//     updateCampaign: {
//         url: `${backendDomain}/api/update-campaign`,
//         method: "post"
//     },
//     updateStory: {
//         url: `${backendDomain}/api/story-update`,
//         method: "post"
//     },
//     getUpdateStory: {
//         url: `${backendDomain}/api/get-story-update`,
//         method: "post"
//     },
//     deletestory: {
//         url: `${backendDomain}/api/delete-story`,
//         method: "post"
//     },
//     categoryWiseCampaign: {
//         url: `${backendDomain}/api/category-campaign`,
//         method: "post"
//     },
//     allUser: {
//         url: `${backendDomain}/api/all-users`,
//         method: "get"
//     },
//     updateUser: {
//         url: `${backendDomain}/api/update-user`,
//         method: "post"
//     },
//     contactDetail: {
//         url: `${backendDomain}/api/contact-detail`,
//         method: "post"
//     },
//     allContact: {
//         url: `${backendDomain}/api/all-contacts`,
//         method: "get"
//     },
//     addbank: {
//         url: `${backendDomain}/api/add-bank`,
//         method: "post"
//     },
//     bankdetail: {
//         url: `${backendDomain}/api/bank-detail`,
//         method: "post"
//     },
//     deletebank: {
//         url: `${backendDomain}/api/delete-bank`,
//         method: "post"
//     },
//     makeDonation: {
//         url: `${backendDomain}/api/make-donation`,
//         method: "post"
//     },
//     allBank: {
//         url: `${backendDomain}/api/all-bank-detail`,
//         method: "get"
//     },
//     donationDetail: {
//         url: `${backendDomain}/api/donation-detail`,
//         method: "post"
//     },
//     campaignuser: {
//         url: `${backendDomain}/api/campaign-user`,
//         method: "post"
//     },
//     withdraw: {
//         url: `${backendDomain}/api/withdraw`,
//         method: "post"
//     },
//     changePassword: {
//         url: `${backendDomain}/api/change-password`,
//         method: "post"
//     }
// };

// export default SummaryApi;
