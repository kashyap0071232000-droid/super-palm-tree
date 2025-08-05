export interface College {
  id: string;
  college_name: string;
  state: string;
  city: string;
  district?: string;
  college_type: 'medical' | 'dental';
  management_type: 'Government' | 'Private' | 'Deemed' | 'Autonomous' | 'Trust' | 'Society';
  university_affiliation: string;
  establishment_year: string;
  recognition_status: 'Active' | 'Suspended' | 'Pending' | 'Denied' | 'Closed';
  recognition_details: string;
  nmc_dci_code?: string;
  accreditation: {
    naac_grade?: string;
    naac_score?: number;
    other_accreditations?: string[];
  };
  bond_policy: {
    required: boolean;
    duration_years?: number;
    amount?: number;
    details?: string;
    exemptions?: string[];
  };
  contact_info: {
    address: string;
    phone?: string;
    website?: string;
    email?: string;
    latitude?: number;
    longitude?: number;
  };
  courses: Course[];
  last_updated: string;
  data_source: string;
  validation_status: 'validated' | 'pending' | 'flagged' | 'rejected';
  quality_score: number;
  admin_notes?: string;
  facilities?: string[];
  rankings?: Ranking[];
  notable_features?: string[];
}

export interface Course {
  course_type: 'MBBS' | 'BDS' | 'MD' | 'MS' | 'MDS' | 'DM' | 'MCh' | 'PG_Diploma' | 'Fellowship';
  specialization: string;
  duration_years: number;
  total_seats: number;
  seat_allocation: {
    aiq_seats: number;
    state_quota_seats: number;
    management_quota_seats: number;
    nri_seats?: number;
    sponsored_seats?: number;
  };
  category_breakdown: {
    general: number;
    sc: number;
    st: number;
    obc: number;
    ews: number;
  };
  fees_structure: {
    government_quota?: {
      annual_fee: number;
      total_course_fee: number;
    };
    management_quota?: {
      annual_fee: number;
      total_course_fee: number;
    };
    nri_quota?: {
      annual_fee: number;
      total_course_fee: number;
    };
  };
  academic_year: string;
  recognition_year?: string;
  first_batch_year?: string;
  intake_approved_by?: string;
  cutoff_data?: {
    last_year_cutoff: {
      general?: number;
      sc?: number;
      st?: number;
      obc?: number;
      ews?: number;
    };
    competition_ratio?: number;
  };
}

export interface Ranking {
  agency: string;
  rank: number;
  year: string;
}