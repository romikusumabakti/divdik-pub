package org.pubpasim.divdik.service;

import org.pubpasim.divdik.model.AccountDetails;
import org.pubpasim.divdik.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AccountDetailsService implements UserDetailsService {

    AccountRepository accountRepository;

    @Autowired
    public AccountDetailsService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        return new AccountDetails(accountRepository.findByUsername(username));
    }

}
