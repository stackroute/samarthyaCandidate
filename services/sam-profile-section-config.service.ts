import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

// The section names should match with that of profile data (i.e., profile mongo scheme)

@Injectable()
export class SamProfileSectionConfigService {
    sectionConfigColln: Object = {};
    private viewConfigUrl: string = 'http://localhost:3010/ProfileSectionViewConfig';
    private formConfigUrl: string = 'http://localhost:3010/ProfileSectionFormConfig';

    constructor(private http: Http) {
        // make HTTP Call to get the section config data
        // As this is a service, we assume this code is called only once,
        // hence don't have to go to server to get the configurations for profile sections
    }

    // for composite and nested type of values
    // dataFieldName :{
    //     "type":"conposite/nested",
    //     "fields" :['field1','field2'],
    //     "delimiter":' '/' ,';
    // }


    // this fuction will get all config for VIEW sections
    getProfileSectionConfig() {
        return this.http.get(this.viewConfigUrl)
            .map((response: Response) => response.json());
    }

    // this function will get all config for FORM section
    getProfileSectionFormConfig() {
        return this.http.get(this.formConfigUrl)
            .map((response: Response) => response.json());
    }

}
