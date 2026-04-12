import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { AppButton } from '@/components/ui/AppButton/AppButton';
import { fallbackBreeds } from '@/data/mockData';
import type { BreedOption } from '@/types/cws';
import { fetchBreeds } from '@/utils/catApi';
import styles from './CatRegistrationModal.module.scss';

type CatRegistrationModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: { displayName: string; breedId: string; breedName: string }) => Promise<void> | void;
  submitting: boolean;
};

export const CatRegistrationModal = ({ open, onClose, onSubmit, submitting }: CatRegistrationModalProps) => {
  const [displayName, setDisplayName] = useState('');
  const [breedId, setBreedId] = useState('sphy');
  const [breeds, setBreeds] = useState<BreedOption[]>(fallbackBreeds);
  const [loadingBreeds, setLoadingBreeds] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (!open) {
      return;
    }

    let active = true;
    setLoadingBreeds(true);

    void fetchBreeds().then((payload) => {
      if (!active) {
        return;
      }

      setBreeds(payload);
      setLoadingBreeds(false);
    });

    return () => {
      active = false;
    };
  }, [open]);

  const selectedBreed = useMemo(
    () => breeds.find((breed) => breed.id === breedId) ?? fallbackBreeds[0],
    [breedId, breeds]
  );

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!displayName.trim()) {
      setValidationError('Tell CWS what this cat account should be called.');
      return;
    }

    if (!selectedBreed) {
      setValidationError('Pick a breed to prove you are, in fact, a cat.');
      return;
    }

    setValidationError('');
    await onSubmit({ displayName: displayName.trim(), breedId: selectedBreed.id, breedName: selectedBreed.name });
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="cat-registration-title">
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Cat account access</p>
            <h2 id="cat-registration-title">Register a viewer account</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close registration modal">
            ×
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Account display name</span>
            <input
              type="text"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Princess Pawsworth"
            />
          </label>

          <label className={styles.field}>
            <span>Captcha: I am a cat because I am a…</span>
            <select value={breedId} onChange={(event) => setBreedId(event.target.value)} disabled={loadingBreeds}>
              {breeds.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.noteCard}>
            <strong>Playground note</strong>
            <p>
              This saves a demo account in localStorage so judges can poke around the UI without a real backend.
            </p>
          </div>

          {validationError ? <p className={styles.error}>{validationError}</p> : null}

          <div className={styles.actions}>
            <AppButton variant="secondary" type="button" onClick={onClose}>
              Cancel
            </AppButton>
            <AppButton type="submit" disabled={submitting}>
              {submitting ? 'Creating account…' : 'Create cat account'}
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  );
};
