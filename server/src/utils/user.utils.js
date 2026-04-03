export const buildPublicUser = (user) => ({
    _id: user._id,
    Name: user.Name,
    emailId: user.emailId,
    contact: user.contact,
    role: user.role,
    availableModes: user.availableModes,
    activeMode: user.activeMode,
    preferredLanguage: user.preferredLanguage,
    languages: user.languages,
    verified: user.verified,
    rating: user.rating,
    ratingCount: user.ratingCount,
    coins: user.coins,
    wallet: user.wallet,
    workerProfile: user.workerProfile,
    subscription: user.subscription,
    locationText: user.locationText,
    upiId: user.upiId,
});

export const hasMode = (user, mode) =>
    Array.isArray(user?.availableModes) && user.availableModes.includes(mode);
