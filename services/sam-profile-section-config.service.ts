import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

//The section names should match with that of profile data (i.e., profile mongo scheme)

@Injectable()
export class SamProfileSectionConfigService {
    sectionConfigColln: Object = {};

    constructor() {
        //make HTTP Call to get the section config data 
        //As this is a service, we assume this code is called only once, 
        //hence don't have to go to server to get the configurations for profile sections
    }

    // for composite and nested type of values 
    // dataFieldName :{
    //     "type":"conposite/nested",
    //     "fields" :['field1','field2'],
    //     "delimiter":' '/' ,';
    // }

    getProfileSectionConfig() {
        // hardcoaded data need to take from json
        return {
            'personalInfo': {
                "fields": [
                    {
                        "elemType": "icon-div",
                        "elemName": "name",
                        "elemLabel": "Name",
                        "elemOrder": 1,
                        "dataDescriptor": {
                            "dataFieldName": 'displayname',
                            "icon": "person",
                            "info": "Your Full Name"
                        }
                    },
                    {
                        "elemType": "icon-div",
                        "elemName": "email",
                        "elemLabel": "E-Mail",
                        "elemOrder": 2,
                        "dataDescriptor": {
                            "dataFieldName": "email",
                            "icon": "email",
                            "info": "Your Primary Email Address"
                        }
                    }, {
                        "elemType": "icon-div",
                        "elemName": "altemail",
                        "elemLabel": "Alternate E-Mail",
                        "elemOrder": 3,
                        "dataDescriptor": {
                            "dataFieldName": "altemail",
                            "icon": "email",
                            "info": "Your Alternate Email Address"
                        }
                    }, {
                        "elemType": "icon-div",
                        "elemName": "phone",
                        "elemLabel": "Phone number",
                        "elemOrder": 3,
                        "dataDescriptor": {
                            "dataFieldName": {
                                "type": "nested",
                                "fields": ["contact", "I"]
                            },
                            "icon": "phone",
                            "info": "Contact number"
                        }
                    },
                    {
                        "elemType": "icon-div",
                        "elemName": "altephone",
                        "elemLabel": "Alternate Phone number",
                        "elemOrder": 3,
                        "dataDescriptor": {
                            "dataFieldName": {
                                "type": "nestedArrey",
                                "fields": ["contact", "II"]
                            },
                            "icon": "phone",
                            "info": "Alternate Contact number"
                        }
                    },
                    {
                        "elemType": "text-div",
                        "elemName": "address1",
                        "elemLabel": "Address",
                        "elemOrder": 7,
                        "dataDescriptor": {
                            "dataFieldName": "",
                            "label": "Primary Address",
                        }
                    },
                    {
                        "elemType": "title-div",
                        "elemName": "address1",
                        "elemLabel": "Address Line 1",
                        "elemOrder": 7,
                        "dataDescriptor": {
                            "dataFieldName": {
                                "type": "nestedArrey",
                                "fields": ["address", 0, "address1"]
                            },
                            "title": "Line 1",
                            "info": "Address Line 1"
                        }
                    },
                    {
                        "elemType": "title-div",
                        "elemName": "address2",
                        "elemLabel": "Address Line 2",
                        "elemOrder": 8,
                        "dataDescriptor": {
                            "dataFieldName": {
                                "type": "nestedArrey",
                                "fields": ["address", 0, "address2"]
                            },
                            "title": "Line 2",
                            "info": "Address Line 2"
                        }
                    },
                    {
                        "elemType": "title-div",
                        "elemName": "landmark",
                        "elemLabel": "Landmark",
                        "elemOrder": 9,
                        "dataDescriptor": {
                            "dataFieldName": {
                                "type": "nestedArrey",
                                "fields": ["address", 0, "landmark"]
                            },
                            "title": "Landmark",
                            "info": "Landmark"
                        }
                    },
                    {
                        "elemType": "title-div",
                        "elemName": "district",
                        "elemLabel": "District",
                        "elemOrder": 10,
                        "dataDescriptor": {
                            "dataFieldName": {
                                "type": "nestedArrey",
                                "fields": ["address", 0, "district"]
                            },
                            "title": "District",
                            "info": "District"
                        }
                    },
                    {
                        "elemType": "title-div",
                        "elemName": "state",
                        "elemLabel": "State",
                        "elemOrder": 11,
                        "dataDescriptor": {
                            "dataFieldName": {
                                "type": "nestedArrey",
                                "fields": ["address", 0, "state"]
                            },
                            "title": "State",
                            "info": "State"
                        }
                    }
                ]
            },
            'skills': {
                "fields": [
                    {
                        "elemType": "chips",
                        "elemName": "name",
                        "elemLabel": "Name",
                        "elemOrder": 1,
                        "dataDescriptor": {
                            "dataFieldName": {
                                "type": "nestedArrey",
                                "fields": [0, "name"]
                            },
                            // "icon": "mood",
                            "info": "my skill"
                        }
                    },
                    {
                        "elemType": "chips",
                        "elemName": "name",
                        "elemLabel": "Name",
                        "elemOrder": 1,
                        "dataDescriptor": {
                            "dataFieldName": {
                                "type": "nestedArrey",
                                "fields": [1, "name"]
                            },
                            // "icon": "mood",
                            "info": "my skill"
                        }
                    }
                ]
            }
        }
    }

    getProfileSectionFormConfig() {
        // hardcoaded data need to take from json
        return {
            'personalInfo': {
                "fields": [
                    // {
                    //     "elemType": "label",
                    //     "elemName": "name",
                    //     "elemLabel": "Name",
                    //     "elemOrder": 1,
                    //     "dataDescriptor": {
                    //         // "dataFieldName": 'displayname',
                    //         "label": "My Name is "
                    //     }
                    // },
                    {
                        "elemType": "input",
                        "elemName": "displayname",
                        "elemLabel": "Name",
                        "elemOrder": 1,
                        "dataDescriptor": {
                            "dataFieldName": 'displayname',
                            "label": "Display Name"
                        }
                    },
                    // {
                    //     "elemType": "label",
                    //     "elemName": "name",
                    //     "elemLabel": "Name",
                    //     "elemOrder": 1,
                    //     "dataDescriptor": {
                    //         // "dataFieldName": 'displayname',
                    //         "label": "My Primary Email is "
                    //     }

                    // }, 
                    {
                        "elemType": "input",
                        "elemName": "email",
                        "elemLabel": "Name",
                        "elemOrder": 1,
                        "dataDescriptor": {
                            "dataFieldName": 'email',
                            "label": "Primary email"
                        }
                    },
                    // {
                    //     "elemType": "label",
                    //     "elemName": "name",
                    //     "elemLabel": "Name",
                    //     "elemOrder": 1,
                    //     "dataDescriptor": {
                    //         // "dataFieldName": 'displayname',
                    //         "label": "My Alternate Email is "
                    //     }
                    // },
                    {
                        "elemType": "input",
                        "elemName": "altemail",
                        "elemLabel": "Name",
                        "elemOrder": 1,
                        "dataDescriptor": {
                            "dataFieldName": 'altemail',
                            "label": "Alternate Email"
                        }
                    },
                    // {
                    //     "elemType": "label",
                    //     "elemName": "name",
                    //     "elemLabel": "Name",
                    //     "elemOrder": 1,
                    //     "dataDescriptor": {
                    //         // "dataFieldName": 'displayname',
                    //         "label": "My Primary Contact No. is "
                    //     }
                    // },
                    {
                        "elemType": "input",
                        "elemName": "contact-I",
                        "elemLabel": "Name",
                        "elemOrder": 1,
                        "dataDescriptor": {
                            "dataFieldName": {
                                "type": "nestedArrey",
                                "fields": ["contact", "I"]
                            },
                            "label": "Primary Contact No."
                        }
                    },
                    // {
                    //     "elemType": "label",
                    //     "elemName": "name",
                    //     "elemLabel": "Name",
                    //     "elemOrder": 1,
                    //     "dataDescriptor": {
                    //         // "dataFieldName": 'displayname',
                    //         "label": "My Alternate Contact No. is "
                    //     }
                    // },
                    {
                        "elemType": "input",
                        "elemName": "contact-II",
                        "elemLabel": "Name",
                        "elemOrder": 1,
                        "dataDescriptor": {
                            "dataFieldName": {
                                "type": "nestedArrey",
                                "fields": ["contact", "II"]
                            },
                            "label": "Alternate Contact No."
                        }
                    },

                ]
            },
            'skills': {
                "fields": [
                    {
                        "elemType": "label",
                        "elemName": "form",
                        "elemLabel": "form",
                        "elemOrder": 1,
                        "dataDescriptor": {
                            // "dataFieldName": 'skillname',
                            // "icon": "wc",
                            "label": "skills here"
                        }
                    },
                    {
                        "elemType": "label",
                        "elemName": "form",
                        "elemLabel": "form",
                        "elemOrder": 1,
                        "dataDescriptor": {
                            // "dataFieldName": 'skillname',
                            // "icon": "wc",
                            "info": "skillls 2222"
                        }
                    }
                ]
            }
        }

    }
}
