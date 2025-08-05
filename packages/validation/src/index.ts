import { z } from 'zod';

export const CollegeSchema = z.object({
  id: z.string(),
  college_name: z.string(),
  state: z.string(),
  city: z.string(),
  district: z.string().optional(),
  college_type: z.enum(['medical', 'dental']),
  management_type: z.enum(['Government', 'Private', 'Deemed', 'Autonomous', 'Trust', 'Society']),
  university_affiliation: z.string(),
  establishment_year: z.string(),
  recognition_status: z.enum(['Active', 'Suspended', 'Pending', 'Denied', 'Closed']),
  recognition_details: z.string(),
  nmc_dci_code: z.string().optional(),
  accreditation: z.object({
    naac_grade: z.string().optional(),
    naac_score: z.number().optional(),
    other_accreditations: z.array(z.string()).optional(),
  }),
  bond_policy: z.object({
    required: z.boolean(),
    duration_years: z.number().optional(),
    amount: z.number().optional(),
    details: z.string().optional(),
    exemptions: z.array(z.string()).optional(),
  }),
  contact_info: z.object({
    address: z.string(),
    phone: z.string().optional(),
    website: z.string().optional(),
    email: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  courses: z.array(z.any()), // For now, accept any
  last_updated: z.string(),
  data_source: z.string(),
  validation_status: z.enum(['validated', 'pending', 'flagged', 'rejected']),
  quality_score: z.number(),
  admin_notes: z.string().optional(),
  facilities: z.array(z.string()).optional(),
  rankings: z.array(z.any()).optional(),
  notable_features: z.array(z.string()).optional(),
});

export function validateCollege(college: unknown) {
  return CollegeSchema.safeParse(college);
}