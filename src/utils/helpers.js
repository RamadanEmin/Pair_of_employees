import _ from 'lodash';
import moment from 'moment/moment';

const findLongestWorkedPair = (data) => {
    if (data && data.length > 0) {
        let pairsWorkedTogether = {};

        for (let i = 0; i < data.length - 1; i++) {
            const { EmpID, ProjectID, DateFrom, DateTo } = data[i];

            for (let j = i + 1; j < data.length; j++) {
                const { EmpID: otherEmpID, ProjectID: otherProjectID, DateFrom: otherDateFrom, DateTo: otherDateTo } = data[j];

                if (EmpID !== otherEmpID && ProjectID === otherProjectID) {
                    const startDate = moment(DateFrom);
                    const endDate = moment(DateTo);
                    const otherStartDate = moment(otherDateFrom);
                    const otherEndDate = moment(otherDateTo);

                    if (startDate.isSameOrBefore(otherEndDate) && endDate.isSameOrAfter(otherStartDate)) {
                        const overlappingStartDate = moment.max(startDate, otherStartDate);
                        const overlappingEndDate = moment.min(endDate, otherEndDate);
                        const daysWorked = overlappingEndDate.diff(overlappingStartDate, 'days') + 1;

                        const pairKey = `${EmpID}-${otherEmpID}`;
                        if (!pairsWorkedTogether[pairKey]) {
                            pairsWorkedTogether[pairKey] = {
                                EmpID1: EmpID,
                                EmpID2: otherEmpID,
                                Projects: {}
                            };
                        }

                        if (!pairsWorkedTogether[pairKey].Projects[ProjectID]) {
                            pairsWorkedTogether[pairKey].Projects[ProjectID] = 0;
                        }

                        pairsWorkedTogether[pairKey].Projects[ProjectID] += daysWorked;
                    }
                }
            }
        }

        const mostCollaborativePair = Object.values(pairsWorkedTogether).reduce((maxPair, currentPair) => {
            const currentPairTotalDays = Object.values(currentPair.Projects).reduce((total, days) => total + days, 0);
            const maxPairTotalDays = Object.values(maxPair.Projects).reduce((total, days) => total + days, 0);

            return currentPairTotalDays > maxPairTotalDays ? currentPair : maxPair;
        }, { Projects: {} });

        if (Object.keys(mostCollaborativePair.Projects).length > 0) {
            const result = Object.entries(mostCollaborativePair.Projects).map(([projectID, days]) => ({
                EmpID1: mostCollaborativePair.EmpID1,
                EmpID2: mostCollaborativePair.EmpID2,
                ProjectID: projectID,
                Days: days
            }));

            return result;
        }
    }

    return [];
};

const groupWorkedDaysByProject = (data) => {
    if (data && data.length > 0) {
        const groupedWorkedDays = data.reduce((acc, { EmpID, ProjectID, DateFrom, DateTo }) => {
            const startDate = moment(DateFrom).isSame(moment(), 'day') ? moment() : moment(DateFrom);
            const endDate = moment(DateTo).isSame(moment(), 'day') ? moment() : moment(DateTo);
            const daysWorked = endDate.diff(startDate, 'days') + 1;

            if (acc[ProjectID]) {
                acc[ProjectID] += daysWorked;
            } else {
                acc[ProjectID] = daysWorked;
            }

            return acc;
        }, {});

        return Object.entries(groupedWorkedDays).sort((a, b) => b[1] - a[1]);
    }
};

const completedProjects = (data) => {
    if (data && data.length > 0) {
        const groupedProjects = _.groupBy(data, 'ProjectID').valueOf();
        const orderedProjects = _.mapValues(groupedProjects, projects => _.orderBy(projects, 'DateTo', 'desc'));
        const completedProjects = _.map(orderedProjects, _.first);
        const filteredProjects = completedProjects.filter(project => moment(project.DateTo).isBefore(moment(), 'day'));
        const result = filteredProjects.map(({ ProjectID, DateTo }) => ({ ProjectID, DateTo }));

        return result;
    }
};

const groupIncompleteProjects = (data) => {
    if (data && data.length > 0) {
        const groupedProjects = _.groupBy(data, 'ProjectID').valueOf();
        const orderedProjects = _.mapValues(groupedProjects, projects => _.orderBy(projects, 'DateTo', 'desc'));
        const incompleteProjects = _.map(orderedProjects, _.first);
        const filteredProjects = incompleteProjects.filter(project => moment(project.DateTo).isSame(moment(), 'day'));
        const result = filteredProjects.map(({ ProjectID }) => ({ ProjectID }));

        return result;
    }
};

export {
    findLongestWorkedPair,
    groupWorkedDaysByProject,
    completedProjects,
    groupIncompleteProjects,
};