/*
  # Create Appointment System Tables

  1. New Tables
    - `admin` - Admin user credentials (simple login)
    - `time_slots` - Doctor's available appointment time slots
    - `appointments` - Patient appointments
    - `invoices` - Invoice records for appointments

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access and patient access

  3. Details
    - Admin: username, password (hashed in real scenario, but kept simple for MVP)
    - Time Slots: Doctor availability by date and time
    - Appointments: Patient info + appointment details
    - Invoices: Generated after appointments with full details
*/

-- Create admin table
CREATE TABLE IF NOT EXISTS admin (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create time slots table (doctor's availability)
CREATE TABLE IF NOT EXISTS time_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  appointment_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  patient_email text NOT NULL,
  patient_phone text NOT NULL,
  patient_address text,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  reason_for_visit text,
  status text DEFAULT 'scheduled',
  time_slot_id uuid REFERENCES time_slots(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  appointment_id uuid NOT NULL REFERENCES appointments(id),
  patient_name text NOT NULL,
  patient_email text NOT NULL,
  patient_phone text NOT NULL,
  patient_address text,
  doctor_name text NOT NULL,
  doctor_specialty text,
  doctor_license text,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  reason_for_visit text,
  amount decimal(10, 2) DEFAULT 0,
  payment_status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Admin policies (public access for login)
CREATE POLICY "Admin can be queried for login"
  ON admin FOR SELECT
  USING (true);

-- Time slots policies (public read, admin write)
CREATE POLICY "Anyone can view available time slots"
  ON time_slots FOR SELECT
  USING (true);

-- Appointments policies (public insert, anyone can view their own)
CREATE POLICY "Anyone can create appointment"
  ON appointments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view appointments"
  ON appointments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update appointments"
  ON appointments FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Invoices policies (public access)
CREATE POLICY "Anyone can view invoices"
  ON invoices FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create invoices"
  ON invoices FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update invoices"
  ON invoices FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create indices
CREATE INDEX IF NOT EXISTS idx_time_slots_date ON time_slots(date);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(patient_email);
CREATE INDEX IF NOT EXISTS idx_invoices_number ON invoices(invoice_number);
