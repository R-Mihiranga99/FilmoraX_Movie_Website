import React, { useState } from 'react';
import './Settings.css';
import DarkMode from '../components/DarkMode/DarkMode';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'en',
    privacy: 'public'
  });

  const handleToggle = (setting) => {
    setSettings({ ...settings, [setting]: !settings[setting] });
  };

  const handleSelect = (setting, value) => {
    setSettings({ ...settings, [setting]: value });
  };

  return (
    <div className="settings-page-container">
      <h1 className="settings-title">Settings</h1>
      <p className="settings-subtitle">Manage your account settings and preferences</p>

      <div className="settings-section">
        <h2 className="settings-section-title">Appearance</h2>
        
        <div className="settings-item">
          <div className="settings-item-info">
            <div className="settings-item-title">Dark Mode</div>
            <div className="settings-item-description">Use dark theme throughout the app</div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
              className="toggle-input"
            />
            <span className={`toggle-slider ${settings.darkMode ? 'active' : ''}`}>
              <span className="toggle-thumb" />
            </span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="settings-section-title">Notifications</h2>
        
        <div className="settings-item settings-item-border">
          <div className="settings-item-info">
            <div className="settings-item-title">Email Notifications</div>
            <div className="settings-item-description">Receive email updates about your account</div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
              className="toggle-input"
            />
            <span className={`toggle-slider ${settings.emailNotifications ? 'active' : ''}`}>
              <span className="toggle-thumb" />
            </span>
          </label>
        </div>

        <div className="settings-item">
          <div className="settings-item-info">
            <div className="settings-item-title">Push Notifications</div>
            <div className="settings-item-description">Receive push notifications on your device</div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={() => handleToggle('pushNotifications')}
              className="toggle-input"
            />
            <span className={`toggle-slider ${settings.pushNotifications ? 'active' : ''}`}>
              <span className="toggle-thumb" />
            </span>
          </label>
        </div>
      </div>


      <div className="settings-section">
        <h2 className="settings-section-title">Privacy</h2>
        
        <div className="settings-item">
          <div className="settings-item-info">
            <div className="settings-item-title">Profile Visibility</div>
          </div>
        </div>
        <div className="privacy-options">
          {['public', 'private', 'friends'].map((option) => (
            <button
              key={option}
              onClick={() => handleSelect('privacy', option)}
              className={`privacy-button ${settings.privacy === option ? 'active' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h2 className="settings-section-title">Language & Region</h2>
        
        <div className="settings-item">
          <div className="settings-item-info">
            <div className="settings-item-title">Language</div>
          </div>
        </div>
        <select
          value={settings.language}
          onChange={(e) => handleSelect('language', e.target.value)}
          className="language-select"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="ja">日本語</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPage;