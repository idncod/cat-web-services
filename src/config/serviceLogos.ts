export const SERVICE_LOGO_MAP: Record<string, { src: string; label: string }> = {
    home: {
        src: '/logos/cws-mainmark.svg',
        label: 'CWS Console'
    },
    catops: {
        src: '/logos/catops.svg',
        label: 'CatOps'
    },
    iam: {
        src: '/logos/identity-and-meowment.svg',
        label: 'Identity and Meowment'
    },
    clawedwatch: {
        src: '/logos/clawedwatch.svg',
        label: 'ClawedWatch'
    },
    sns: {
        src: '/logos/snack-notification-service.svg',
        label: 'Snack Notification Service'
    },
    s3: {
        src: '/logos/scratch-sleep-store.svg',
        label: 'Scratch, Sleep, Store'
    },
    route9: {
        src: '/logos/route-9-lives.svg',
        label: 'Route 9 Lives'
    },
    clawedshell: {
        src: '/logos/clawedshell.svg',
        label: 'ClawedShell'
    }
};

export const getServiceLogo = (serviceKey?: string | null) => {
    if (!serviceKey) {
        return SERVICE_LOGO_MAP.home;
    }

    return SERVICE_LOGO_MAP[serviceKey] ?? SERVICE_LOGO_MAP.home;
};