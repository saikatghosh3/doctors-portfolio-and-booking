import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getMongoDb } from '@/lib/mongodb';
import { serializeDoc } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  const body = await req.json();
  const {
    patient_name,
    patient_email,
    patient_phone,
    patient_address,
    reason_for_visit,
    selectedSlot,
  } = body;

  if (!selectedSlot?.id || !patient_name || !patient_email || !patient_phone || !patient_address) {
    return NextResponse.json({ error: 'Missing required appointment or patient data.' }, { status: 400 });
  }

  const db = await getMongoDb();
  const appointmentResult = await db.collection('appointments').insertOne({
    patient_name,
    patient_email,
    patient_phone,
    patient_address,
    reason_for_visit,
    appointment_date: selectedSlot.date,
    appointment_time: selectedSlot.time,
    status: 'scheduled',
    time_slot_id: selectedSlot.id,
    created_at: new Date().toISOString(),
  });

  const appointmentId = appointmentResult.insertedId.toString();
  await db.collection('time_slots').updateOne(
    { _id: new ObjectId(selectedSlot.id) },
    { $set: { is_available: false, appointment_id: appointmentId } }
  );

  const invoiceNumber = `INV-${Date.now()}`;
  await db.collection('invoices').insertOne({
    invoice_number: invoiceNumber,
    appointment_id: appointmentId,
    patient_name,
    patient_email,
    patient_phone,
    patient_address,
    doctor_name: 'Dr. Alistair Thorne',
    doctor_specialty: 'Cardiology',
    doctor_license: 'LIC-12345-CARDIO',
    appointment_date: selectedSlot.date,
    appointment_time: selectedSlot.time,
    reason_for_visit,
    amount: 0,
    payment_status: 'pending',
    created_at: new Date().toISOString(),
  });

  const appointment = await db.collection('appointments').findOne({ _id: new ObjectId(appointmentId) });
  return NextResponse.json({ appointment: serializeDoc(appointment) });
}
