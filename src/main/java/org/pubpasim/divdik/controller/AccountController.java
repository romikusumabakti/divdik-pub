package org.pubpasim.divdik.controller;

import org.pubpasim.divdik.model.Account;
import org.pubpasim.divdik.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    AccountRepository accountRepository;
    PasswordEncoder passwordEncoder;

    @Autowired
    public AccountController(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<Account> index() {
        return accountRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Account> find(@PathVariable Long id) {
        return accountRepository.findById(id);
    }

    @PostMapping
    public Account create(@RequestBody Account account) {
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return accountRepository.save(account);
    }

}
