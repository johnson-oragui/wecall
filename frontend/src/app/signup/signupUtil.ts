export default class SignupUtil {
	static validatePassword = (password: string): string => {
		if (password === '') return '';
		if (password.length < 8) {
			return 'Password must be at least 8 characters long';
		}

		if (!/[A-Z]/.test(password)) {
			return 'Password must contain least one uppercase letter';
		}

		if (!/[a-z]/.test(password)) {
			return 'Password must contain least one lowercase letter';
		}

		if (!/\d/.test(password)) {
			return 'Password must contain least one digit (0-9)';
		}

		if (/\s/.test(password)) {
			return 'Password must not contain whitespace';
		}

		if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
			return 'Password must contain least one special character.';
		}

		return '';
	};

	static validateEmail = (email: string): string => {
		if (email === '') return '';
		if (email.trim() === '') {
			return 'Email address is required';
		}
		const atSymbolIndex = email.indexOf('@');
		if (atSymbolIndex === -1) {
			return 'Email must contain @ symbol';
		}

		if (email.indexOf('@', atSymbolIndex + 1) !== -1) {
			return 'Email can only contain one @ symbol';
		}

		const localPart = email.substring(0, atSymbolIndex);
		if (localPart.length === 0) {
			return 'Add username before @ symbol';
		}
		if (localPart.length > 64) {
			return 'username before @ symbol cannot exceed 64 characters';
		}

		const localPartRegex =
			/^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*$/;
		if (!localPartRegex.test(localPart)) {
			return `Email's username contains invalid characters or format`;
		}
		if (localPart.startsWith('.') || localPart.endsWith('.')) {
			return `Email's username cannot start or end with a dot`;
		}

		if (localPart.includes('..')) {
			return `Email's username cannot contain consecutive dots`;
		}

		const domainPart = email.substring(atSymbolIndex + 1);

		if (domainPart.length === 0) {
			return `Add Email's domain name after @ symbol`;
		}

		if (domainPart.length > 255) {
			return `Email's domain name after @ cannot exceed 255 characters`;
		}

		const dotIndex = domainPart.indexOf('.');
		if (dotIndex === -1) {
			return 'Add a domain extension like .com, .org, etc.';
		}

		if (domainPart.startsWith('.') || domainPart.startsWith('-')) {
			return 'Domain cannot start with a dot or hyphen';
		}

		if (domainPart.endsWith('.') || domainPart.endsWith('-')) {
			return 'Domain cannot end with a dot or hyphen';
		}

		if (domainPart.includes('..') || domainPart.includes('--')) {
			return 'Email domain cannot contain consecutive dots or hyphens';
		}

		const domainLabels = domainPart.split('.');

		domainLabels.forEach((label, index) => {
			if (label.length === 0) {
				return `Domain label ${index + 1} cannot be empty`;
			} else if (label.length > 63) {
				return `Domain label "${label}" cannot exceed 63 characters`;
			}

			const labelRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

			if (!labelRegex.test(label)) {
				return `Email domain label "${label}" contains invalid characters`;
			}
		});

		const lastLabel = domainLabels[domainLabels.length - 1];
		if (/^\d+$/.test(lastLabel)) {
			return 'Email domain (last part) cannot be all numbers';
		}

		if (lastLabel.length < 2) {
			return 'Top-level domain must be at least 2 characters';
		}

		const commonTypos: Record<string, string> = {
			'gmial.com': 'gmail.com',
			'gmal.com': 'gmail.com',
			'gamil.com': 'gmail.com',
			'gmil.com': 'gmail.com',
			'yahooo.com': 'yahoo.com',
			'yaho.com': 'yahoo.com',
			'yhoo.com': 'yahoo.com',
			'yho.com': 'yahoo.com',
			'hotmal.com': 'hotmail.com',
			'hotmai.com': 'hotmail.com',
			'hotmil.com': 'hotmail.com',
			'htmail.com': 'hotmail.com',
			'outloo.com': 'outlook.com',
			'outlok.com': 'outlook.com',
			'gmai.com': 'gmail.com',
		};

		const lowerDomain = domainPart.toLowerCase();
		if (commonTypos[lowerDomain]) {
			return `Did you mean ${commonTypos[lowerDomain]}?`;
		}

		if (email.includes(' ')) {
			return 'Email cannot contain spaces';
		}

		// Check for common disposable email domains
		const disposableDomains = [
			'tempmail.com',
			'10minutemail.com',
			'throwaway.com',
			'guerrillamail.com',
			'mailinator.com',
			'yopmail.com',
			'temp-mail.org',
			'sharklasers.com',
			'trashmail.com',
		];

		const domainLower = domainPart.toLowerCase();
		if (disposableDomains.some((d) => domainLower.includes(d))) {
			return 'Disposable/Temporary email address not allowed';
		}

		if (email.length > 254) {
			return 'Email address cannot exceed 254 characters';
		}

		return '';
	};

	static validateUsername = (username: string): string => {
		if (username === '') return '';
		const trimmedUsername = username.trim();

		const opts = {
			minLength: 3,
			maxLength: 30,
			allowSpaces: false,
			allowSpecialChars: false,
			reservedWords: [
				'admin',
				'administrator',
				'moderator',
				'owner',
				'system',
				'support',
				'help',
			],
			checkProfanity: false,
		};

		if (trimmedUsername.length < opts.minLength) {
			return `Must be at least ${opts.minLength} characters long`;
		}

		if (trimmedUsername.length > opts.maxLength) {
			return `Cannot exceed ${opts.maxLength} characters`;
		}

		if (opts.allowSpecialChars) {
			// Allow letters, numbers, underscores, and common special characters
			const specialCharsRegex = /^[a-zA-Z0-9_\-\.@\+]+$/;
			if (!specialCharsRegex.test(trimmedUsername)) {
				return 'Can only contain letters, numbers, underscores, hyphens, dots, @, and +';
			}
		} else {
			const alphanumericRegex = /^[a-zA-Z0-9_]+$/;
			if (!alphanumericRegex.test(trimmedUsername)) {
				return 'Can only contain letters, numbers, and underscores';
			}
		}

		if (!opts.allowSpaces && trimmedUsername.includes(' ')) {
			return 'Cannot contain spaces';
		}

		if (opts.reservedWords && opts.reservedWords.length > 0) {
			const lowerUsername = trimmedUsername.toLowerCase();
			const reservedWord = opts.reservedWords.find(
				(word) =>
					lowerUsername === word.toLowerCase() ||
					lowerUsername.includes(word.toLowerCase()),
			);

			if (reservedWord) {
				return `Cannot contain reserved word "${reservedWord}"`;
			}
		}

		if (opts.checkProfanity) {
			const profanityList = [
				'fuck',
				'pussy',
				'butt',
				'dick',
				'twat',
				'motherfucker',
				'fucker',
				'rape',
				'rapper',
				'rapist',
			];

			const lowerUsername = trimmedUsername.toLowerCase();
			const profaneWord = profanityList.find((word) =>
				lowerUsername.includes(word),
			);

			if (profaneWord) {
				return 'Contains inappropriate content';
			}
		}

		if (trimmedUsername.startsWith('_')) {
			return 'Cannot start with an underscore';
		}

		if (trimmedUsername.endsWith('_')) {
			return 'Cannot end with an underscore';
		}

		if (trimmedUsername.includes('__')) {
			return 'Cannot contain consecutive underscores';
		}

		if (/^\d+$/.test(trimmedUsername)) {
			return 'Cannot be all numbers';
		}

		if (trimmedUsername.includes('@') && !opts.allowSpecialChars) {
			return 'Cannot contain @ symbol';
		}

		return '';
	};

	static checkUsernameAvailability = (username: string): string => {
		const validation = this.validateUsername(username);

		if (validation !== '') {
			return validation;
		}

		let isTaken = false;

		fetch('/api/v1/users/searchname', {
			method: 'POST',
			body: JSON.stringify({ username: username.toLowerCase() }),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data.data.is_taken) {
					isTaken = true;
				}
			})
			.catch((e) => {
				console.error('Error checking username availability');
			});

		if (isTaken) {
			return 'Username is already taken';
		}

		return '';
	};
}
