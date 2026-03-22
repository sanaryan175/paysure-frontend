import FormField, { Input, Select } from './FormField.jsx';

export default function Step1Financial({ data, errors, onChange }) {
  return (
    <div>
      <h3
        className="font-display font-bold text-xl mb-1"
        style={{ color: 'var(--text-primary)', letterSpacing: '-0.4px' }}>
        Your Financial Details
      </h3>
      <p className="text-sm mb-7" style={{ color: 'var(--text-secondary)' }}>
        This helps us evaluate your repayment capacity accurately.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-0 sm:gap-x-5 gap-y-5">
        <FormField label="Monthly Income" hint="after tax" error={errors.monthlyIncome}>
          <Input
            prefix="₹"
            type="number"
            placeholder="e.g. 50000"
            value={data.monthlyIncome}
            onChange={e => onChange('monthlyIncome', e.target.value)}
          />
        </FormField>

        <FormField label="Monthly Expenses" hint="rent, food, bills" error={errors.monthlyExpenses}>
          <Input
            prefix="₹"
            type="number"
            placeholder="e.g. 20000"
            value={data.monthlyExpenses}
            onChange={e => onChange('monthlyExpenses', e.target.value)}
          />
        </FormField>

        <FormField label="Existing EMIs" hint="0 if none" error={errors.existingEMIs}>
          <Input
            prefix="₹"
            type="number"
            placeholder="e.g. 5000"
            value={data.existingEMIs}
            onChange={e => onChange('existingEMIs', e.target.value)}
          />
        </FormField>

        <FormField label="Current Savings" error={errors.savings}>
          <Input
            prefix="₹"
            type="number"
            placeholder="e.g. 100000"
            value={data.savings}
            onChange={e => onChange('savings', e.target.value)}
          />
        </FormField>

        <div className="sm:col-span-2">
          <FormField label="Job Type" error={errors.jobType}>
            <Select
              value={data.jobType}
              onChange={e => onChange('jobType', e.target.value)}>
              <option value="">Select job type</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self-Employed</option>
              <option value="freelance">Freelance</option>
              <option value="other">Other</option>
            </Select>
          </FormField>
        </div>
      </div>
    </div>
  );
}
